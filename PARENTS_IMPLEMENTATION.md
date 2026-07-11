# 🔧 Батьківська сторінка – Технічна документація

## 📦 Що було створено

### 1. Sanity Schema (`sanity/schemaTypes/parents.js`)

```javascript
export default {
  name: 'parents',
  title: 'Батьківська сторінка (Parents Page)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localeString',
    },
    {
      name: 'documents',
      title: 'Documents for Parents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'parentDocument',
          fields: [
            {
              name: 'title',
              title: 'Document Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Document Description (Optional)',
              type: 'localeText',
            },
            {
              name: 'file',
              title: 'Document File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          fields: [
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
              description: 'Description for accessibility and SEO',
            },
          ],
        },
      ],
    },
  ],
}
```

---

### 2. GROQ Query и Data Functions (`sanity/lib/queries.js`)

#### PARENTS_QUERY

```javascript
export const PARENTS_QUERY = `*[_type == "parents"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  },
  gallery[]{
    image{
      asset->{
        url
      }
    },
    alt
  }
}`
```

#### getParentsData()

```javascript
export async function getParentsData() {
  if (!client) return null

  try {
    return await client.fetch(PARENTS_QUERY)
  } catch (error) {
    console.error('Failed to fetch parents page data from Sanity:', error)
    return null
  }
}
```

#### mapParentsData()

```javascript
export function mapParentsData(data, locale) {
  if (!data) return null

  // Map documents with file type detection
  const documents =
    data.documents && data.documents.length > 0
      ? data.documents
          .map((doc, index) => {
            if (!doc.file?.asset?.url) return null

            const fileUrl = doc.file.asset.url
            const fileName = doc.file.asset.originalFilename || 'document'
            const fileExtension = fileName.split('.').pop().toLowerCase()

            return {
              id: `parent-doc-${index}`,
              title: getLocalizedValue(doc.title, locale),
              description: getLocalizedValue(doc.description, locale),
              fileUrl,
              fileName,
              fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
            }
          })
          .filter(Boolean)
      : []

  // Map gallery images
  const gallery =
    data.gallery && data.gallery.length > 0
      ? data.gallery
          .map((item, index) => {
            if (!item.image?.asset?.url) return null

            return {
              id: `gallery-${index}`,
              imageUrl: item.image.asset.url,
              alt: getLocalizedValue(item.alt, locale),
            }
          })
          .filter(Boolean)
      : []

  if (documents.length === 0 && gallery.length === 0) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
    gallery,
  }
}
```

---

### 3. React Components

#### Parents Component (`app/components/Parents/Parents.js`)

**Основні функції:**

- Отображение заголовка та підзаголовка
- Список документів з іконками типу файлу
- Кнопка Preview для PDF (відкривається в новій вкладці)
- Кнопка Download для всіх форматів
- Фотогалерея з компонентом PhotoGallery

**Props:**

```typescript
interface ParentsProps {
  content: {
    title: string
    subtitle: string
    documents: DocumentItem[]
    gallery: GalleryItem[]
  }
}

interface DocumentItem {
  id: string
  title: string
  description?: string
  fileUrl: string
  fileName: string
  fileType: 'pdf' | 'word'
}

interface GalleryItem {
  id: string
  imageUrl: string
  alt: string
}
```

#### PhotoGallery Component (`app/components/Parents/PhotoGallery.js`)

**Функціональність:**

- Адаптивна сітка фотографій
- Модальне вікно (Lightbox) для перегляду повнорозмірних зображень
- Навігація стрілками ← →
- Клавіатурна навігація (Arrow Keys, ESC)
- Лічильник фотографій (1 / 5)
- Плавні переходи та анімації

**Взаємодія користувача:**

- Клік на мініатюру → відкривається модаль
- Клік стрілки → перехід до наступної/попередньої фото
- ESC або клік поза зображенням → закриття модалі
- Клавіші ←/→ → навігація по фотографіях

---

### 4. Стилі

#### Parents.scss

- BEM методологія
- Адаптивний дизайн (мобіль, планшет, десктоп)
- Hover ефекти на карточках документів
- Зелені кнопки Preview, сині Download
- Максимальна ширина 1200px

#### PhotoGallery.scss

- CSS Grid для мініатюр (auto-fill, minmax)
- Модальне вікно з backdrop фільтром
- Анімації (fadeIn, zoomIn)
- Кнопки навігації (наліво, направо)
- Лічильник позиції в галереї
- Підтримка режиму prefers-reduced-motion

---

### 5. Next.js Page (`app/[locale]/parents/page.js`)

```javascript
import { getParentsData, mapParentsData } from '@/sanity/lib/queries'
import Parents from '@/app/components/Parents/Parents'

export const metadata = {
  title: 'Батьківська сторінка | Educational Portal',
  description: 'Resources and documents for parents',
}

export default async function ParentsPage({ params }) {
  const { locale } = await params

  const parentsData = await getParentsData()
  const content = mapParentsData(parentsData, locale)

  return (
    <div>
      <Parents content={content} />
    </div>
  )
}
```

**Особливості:**

- Асинхронний компонент для серверної выборки
- Поддержка всех языков через `locale` parameter
- Метаданные страницы для SEO

---

### 6. Реєстрація Schema (`sanity/schemaTypes/index.js`)

```javascript
import parents from './parents'

export const schemaTypes = [
  // ... інші схеми
  parents,
]
```

---

### 7. Переводи

**messages/en.json:**

```json
"Parents": {
  "title": "Parents Page",
  "subtitle": "Resources and documents for parents",
  "documents": "Documents",
  "gallery": "Photo Gallery",
  "preview": "Preview",
  "download": "Download",
  "noContent": "No content available"
}
```

**messages/uk.json:**

```json
"Parents": {
  "title": "Батьківська сторінка",
  "subtitle": "Ресурси та документи для батьків",
  "documents": "Документи",
  "gallery": "Фотогалерея",
  "preview": "Переглянути",
  "download": "Завантажити",
  "noContent": "Контент недоступний"
}
```

**messages/ru.json:**

```json
"Parents": {
  "title": "Страница для родителей",
  "subtitle": "Ресурсы и документы для родителей",
  "documents": "Документы",
  "gallery": "Фотогалерея",
  "preview": "Просмотр",
  "download": "Скачать",
  "noContent": "Контент недоступен"
}
```

---

## 🛣️ Маршруты

| URL                                | Описание                                        |
| ---------------------------------- | ----------------------------------------------- |
| `http://localhost:3000/en/parents` | Parents page на английском                      |
| `http://localhost:3000/uk/parents` | Parents page на украинском                      |
| `http://localhost:3000/ru/parents` | Parents page на русском                         |
| `/parents`                         | Автоматически редиректит на `/{locale}/parents` |

---

## 🔄 Поток данних

```
1. User navigates to /[locale]/parents
                    ↓
2. Next.js calls getParentsData()
                    ↓
3. Sanity GROQ Query fetches raw data
                    ↓
4. mapParentsData() transforms & localizes data
                    ↓
5. Parents component receives props
                    ↓
6. Parents component renders:
   - Header with title/subtitle
   - Documents section (if exist)
   - PhotoGallery component (if photos exist)
                    ↓
7. PhotoGallery renders:
   - Grid of thumbnails
   - Modal with navigation (onclick thumbnail)
                    ↓
8. Browser displays parents page
```

---

## 📁 Структура файлів

```
teachers-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── parents.js (NEW)
│   │   └── index.js (UPDATED)
│   └── lib/
│       └── queries.js (UPDATED)
│
├── app/
│   ├── components/
│   │   └── Parents/ (NEW)
│   │       ├── Parents.js
│   │       ├── Parents.scss
│   │       ├── PhotoGallery.js
│   │       └── PhotoGallery.scss
│   │
│   └── [locale]/
│       └── parents/ (NEW)
│           └── page.js
│
└── messages/
    ├── en.json (UPDATED)
    ├── uk.json (UPDATED)
    └── ru.json (UPDATED)
```

---

## 🧪 Локальне тестування

1. **Запустити dev сервер:**

   ```bash
   npm run dev
   ```

2. **Перейти на сторінку:**

   ```
   http://localhost:3000/uk/parents
   ```

3. **Перевірити:**
   - ✅ Заголовок отображається
   - ✅ Документи завантажуються (якщо є в Sanity)
   - ✅ Кнопки Preview і Download функціонують
   - ✅ Фотогалерея відображається
   - ✅ Модаль відкривається при кліку на фото
   - ✅ Навігація стрілками працює
   - ✅ ESC закриває модаль
   - ✅ Адаптивність на мобільних пристроях

---

## 📊 Сравнение: Parents vs Portfolio vs Nush

| Функция        | Portfolio | Useful Links | Nush | Parents |
| -------------- | --------- | ------------ | ---- | ------- |
| Documents      | ✅        | ✅           | ✅   | ✅      |
| Preview PDF    | ✅        | ✅           | ✅   | ✅      |
| Download       | ✅        | ✅           | ✅   | ✅      |
| Photo Gallery  | ❌        | ❌           | ❌   | ✅      |
| Lightbox Modal | ❌        | ❌           | ❌   | ✅      |
| Многоязычность | ✅        | ✅           | ✅   | ✅      |
| Адаптивность   | ✅        | ✅           | ✅   | ✅      |

**Выводы**:

- Parents наследует все возможности от Portfolio/Nush
- Уникальная особенность: встроенная фотогалерея с модальным окном
- Полная совместимость с существующей архитектурой

---

**Версія**: 1.0  
**Дата обновления**: 2024-07-12  
**Статус**: Production Ready
