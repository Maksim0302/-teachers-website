# 🔧 LEGO - конструювання – Технічна документація

## 📦 Що було створено

### 1. Sanity Schema (`sanity/schemaTypes/lego.js`)

```javascript
export default {
  name: 'lego',
  title: 'LEGO - конструювання',
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
      title: 'Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'legoDocument',
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
          name: 'legoGalleryItem',
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

#### LEGO_QUERY

```javascript
export const LEGO_QUERY = `*[_type == "lego"][0]{
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

#### getLegoData()

```javascript
export async function getLegoData() {
  if (!client) return null

  try {
    return await client.fetch(LEGO_QUERY)
  } catch (error) {
    console.error('Failed to fetch LEGO page data from Sanity:', error)
    return null
  }
}
```

#### mapLegoData()

```javascript
export function mapLegoData(data, locale) {
  // Maps documents with file type detection
  // Maps gallery images
  // Returns {title, subtitle, documents, gallery}
}
```

---

### 3. React Components

#### Lego Component (`app/components/Lego/Lego.js`)

**Основні функції:**

- Отображение заголовка та підзаголовка
- Список документів з іконками типу файлу
- Кнопка Preview для PDF (відкривається в новій вкладце)
- Кнопка Download для всіх форматів
- Фотогалерея з компонентом PhotoGallery

**Props:**

```typescript
interface LegoProps {
  content: {
    title: string
    subtitle: string
    documents: DocumentItem[]
    gallery: GalleryItem[]
  }
}
```

#### PhotoGallery Component (`app/components/Lego/PhotoGallery.js`)

**Функціональність:**

- Адаптивна сітка фотографій
- Модальне вікно (Lightbox) для перегляду повнорозмірних зображень
- Навігація стрілками ← →
- Клавіатурна навігація (Arrow Keys, ESC)
- Лічильник фотографій (1 / 5)
- Плавні переходи та анімації
- Відключення скролу при відкритому модальному вікні

---

### 4. Стилі

#### Lego.scss

- BEM методологія
- Адаптивний дизайн (мобіль, планшет, десктоп)
- Hover ефекти на карточках документів
- Зелені кнопки Preview, сині Download
- Максимальна ширина 1200px

#### PhotoGallery.scss

- CSS Grid для мініатюр (auto-fill, minmax)
- Модальне вікно з backdrop фільтром (0.88 opacity)
- Анімації (fadeIn, zoomIn)
- Кнопки навігації (наліво, направо)
- Лічильник позиції в галереї
- Підтримка режиму prefers-reduced-motion

---

### 5. Next.js Page (`app/[locale]/lego/page.js`)

```javascript
export const metadata = {
  title: 'LEGO - конструювання | Educational Portal',
  description: 'LEGO construction and learning resources',
}

export default async function LegoPage({ params }) {
  const { locale } = await params
  const legoData = await getLegoData()
  const content = mapLegoData(legoData, locale)
  return <Lego content={content} />
}
```

---

### 6. Реєстрація Schema (`sanity/schemaTypes/index.js`)

```javascript
import lego from './lego'

export const schemaTypes = [
  // ... інші схеми
  lego,
]
```

---

### 7. Переводи

**messages/en.json:**

```json
"Lego": {
  "title": "LEGO Construction",
  "subtitle": "LEGO building and construction resources",
  "documents": "Documents",
  "gallery": "Photo Gallery",
  "preview": "Preview",
  "download": "Download",
  "noContent": "No content available"
}
```

**messages/uk.json:**

```json
"Lego": {
  "title": "LEGO - конструювання",
  "subtitle": "Матеріали для конструювання та навчання LEGO",
  "documents": "Документи",
  "gallery": "Фотогалерея",
  "preview": "Переглянути",
  "download": "Завантажити",
  "noContent": "Контент недоступний"
}
```

**messages/ru.json:**

```json
"Lego": {
  "title": "LEGO - конструирование",
  "subtitle": "Материалы для конструирования и обучения LEGO",
  "documents": "Документы",
  "gallery": "Фотогалерея",
  "preview": "Просмотр",
  "download": "Скачать",
  "noContent": "Контент недоступен"
}
```

---

## 🛣️ Маршруты

| URL                             | Описание                                     |
| ------------------------------- | -------------------------------------------- |
| `http://localhost:3000/en/lego` | LEGO page на английском                      |
| `http://localhost:3000/uk/lego` | LEGO page на украинском                      |
| `http://localhost:3000/ru/lego` | LEGO page на русском                         |
| `/lego`                         | Автоматически редиректит на `/{locale}/lego` |

---

## 🔄 Поток данних

```
1. User navigates to /[locale]/lego
                    ↓
2. Next.js calls getLegoData()
                    ↓
3. Sanity GROQ Query fetches raw data
                    ↓
4. mapLegoData() transforms & localizes data
                    ↓
5. Lego component receives props
                    ↓
6. Component renders:
   - Header with title/subtitle
   - Documents section (if exist)
   - PhotoGallery component (if photos exist)
                    ↓
7. PhotoGallery renders:
   - Grid of thumbnails
   - Modal with navigation (onclick thumbnail)
                    ↓
8. Browser displays LEGO page
```

---

## 📁 Структура файлів

```
teachers-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── lego.js (NEW)
│   │   └── index.js (UPDATED)
│   └── lib/
│       └── queries.js (UPDATED)
│
├── app/
│   ├── components/
│   │   └── Lego/ (NEW)
│   │       ├── Lego.js
│   │       ├── Lego.scss
│   │       ├── PhotoGallery.js
│   │       └── PhotoGallery.scss
│   │
│   └── [locale]/
│       └── lego/ (NEW)
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
   http://localhost:3000/uk/lego
   ```

3. **Перевірити:**
   - ✅ Заголовок отображається
   - ✅ Документи завантажуються (якщо є в Sanity)
   - ✅ Кнопки Preview і Download функціонують
   - ✅ Фотогалерея відображається
   - ✅ Модаль відкривається при кліку на фото
   - ✅ Навігація стрілками працює
   - ✅ ESC закриває модаль
   - ✅ Скролл відключено при відкритій модалі
   - ✅ Адаптивність на мобільних пристроях

---

## 📊 Сравнение: LEGO vs Parents vs Nush

| Функция        | Portfolio | Useful Links | Nush | Parents | LEGO |
| -------------- | --------- | ------------ | ---- | ------- | ---- |
| Documents      | ✅        | ✅           | ✅   | ✅      | ✅   |
| Preview PDF    | ✅        | ✅           | ✅   | ✅      | ✅   |
| Download       | ✅        | ✅           | ✅   | ✅      | ✅   |
| Photo Gallery  | ❌        | ❌           | ❌   | ✅      | ✅   |
| Lightbox Modal | ❌        | ❌           | ❌   | ✅      | ✅   |
| Многоязычность | ✅        | ✅           | ✅   | ✅      | ✅   |
| Адаптивность   | ✅        | ✅           | ✅   | ✅      | ✅   |

**Выводы**:

- LEGO успешно наследует возможности от Parents
- Полная совместимость с существующей архитектурой
- Готов к масштабированию для других подобных страниц

---

**Версія**: 1.0  
**Дата обновления**: 2024-07-12  
**Статус**: Production Ready
