# 🔧 НУШ – Техническая документация

## 📦 Что было создано

### 1. Sanity Schema (`sanity/schemaTypes/nush.js`)

```javascript
export default {
  name: 'nush',
  title: 'NUŠ (Nova Ukrainska Shkola)',
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
      title: 'NUŠ Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'nushDocument',
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
  ],
}
```

---

### 2. GROQ Query и Data Functions (`sanity/lib/queries.js`)

#### NUSH_QUERY

```javascript
export const NUSH_QUERY = `*[_type == "nush"][0]{
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
  }
}`
```

#### getNushData()

```javascript
export async function getNushData() {
  if (!client) return null

  try {
    return await client.fetch(NUSH_QUERY)
  } catch (error) {
    console.error('Failed to fetch NUŠ data from Sanity:', error)
    return null
  }
}
```

#### mapNushData()

```javascript
export function mapNushData(data, locale) {
  if (!data?.documents?.length) return null

  const documents = data.documents
    .map((doc, index) => {
      if (!doc.file?.asset?.url) return null

      const fileUrl = doc.file.asset.url
      const fileName = doc.file.asset.originalFilename || ''
      const fileExtension = fileName.split('.').pop().toLowerCase()

      return {
        id: `doc-${index}`,
        title: getLocalizedValue(doc.title, locale),
        description: getLocalizedValue(doc.description, locale),
        fileUrl,
        fileName,
        fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!documents.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
  }
}
```

---

### 3. React Component (`app/components/Nush/Nush.js`)

**Основные функции:**

- Отображает НУШ документы в виде карточек
- Показывает название и описание для каждого документа
- Кнопка "Preview" открывает PDF в новой вкладке
- Кнопка "Download" загружает файл
- Полностью адаптивный дизайн
- Поддержка многоязычности через `useTranslations()`

**Props:**

```typescript
interface NushProps {
  content: {
    title: string
    subtitle: string
    documents: {
      id: string
      title: string
      description?: string
      fileUrl: string
      fileName: string
      fileType: 'pdf' | 'word'
    }[]
  }
}
```

---

### 4. Стили (`app/components/Nush/Nush.scss`)

**Особенности:**

- BEM методология (`.nush__...`)
- Полностью адаптивен (мобильный, планшет, десктоп)
- Hover эффекты на карточках
- CSS Grid и Flexbox для расположения
- Медиа-запросы для разных размеров
- Зелёная кнопка для Preview, синяя для Download

---

### 5. Next.js Page (`app/[locale]/nush/page.js`)

```javascript
import { getNushData, mapNushData } from '@/sanity/lib/queries'
import Nush from '@/app/components/Nush/Nush'

export const metadata = {
  title: 'НУШ | Educational Portal',
  description: 'Nova Ukrainska Shkola (NUŠ) documents',
}

export default async function NushPage({ params }) {
  const { locale } = await params

  const nushData = await getNushData()
  const content = mapNushData(nushData, locale)

  return (
    <div>
      <Nush content={content} />
    </div>
  )
}
```

---

### 6. Регистрация Schema (`sanity/schemaTypes/index.js`)

```javascript
import nush from './nush'

export const schemaTypes = [
  // ... другие схемы
  nush,
]
```

---

### 7. Переводы

**messages/en.json:**

```json
"Nush": {
  "title": "NUŠ Documents",
  "subtitle": "Nova Ukrainska Shkola (New Ukrainian School) resources",
  "preview": "Preview",
  "download": "Download",
  "noDocuments": "No documents available"
}
```

**messages/uk.json:**

```json
"Nush": {
  "title": "НУШ Документи",
  "subtitle": "Матеріали Нової Української Школи",
  "preview": "Переглянути",
  "download": "Завантажити",
  "noDocuments": "Документи недоступні"
}
```

**messages/ru.json:**

```json
"Nush": {
  "title": "НУШ Документы",
  "subtitle": "Материалы Новой Украинской Школы",
  "preview": "Просмотр",
  "download": "Скачать",
  "noDocuments": "Документы недоступны"
}
```

---

## 🛣️ Маршруты

| URL                             | Описание                                     |
| ------------------------------- | -------------------------------------------- |
| `http://localhost:3000/en/nush` | НУШ на английском                            |
| `http://localhost:3000/uk/nush` | НУШ на украинском                            |
| `http://localhost:3000/ru/nush` | НУШ на русском                               |
| `/nush`                         | Автоматически редиректит на `/{locale}/nush` |

---

## 🔄 Поток данных

```
1. User navigates to /[locale]/nush
                    ↓
2. Next.js calls getNushData()
                    ↓
3. Sanity GROQ Query fetches raw data
                    ↓
4. mapNushData() transforms & localizes
                    ↓
5. Nush component receives props
                    ↓
6. Component renders HTML
                    ↓
7. Browser shows НУШ documents page
```

---

## 📁 Структура файлов

```
teachers-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── nush.js (NEW)
│   │   └── index.js (UPDATED)
│   └── lib/
│       └── queries.js (UPDATED)
│
├── app/
│   ├── components/
│   │   └── Nush/ (NEW)
│   │       ├── Nush.js
│   │       └── Nush.scss
│   │
│   └── [locale]/
│       └── nush/ (NEW)
│           └── page.js
│
└── messages/
    ├── en.json (UPDATED)
    ├── uk.json (UPDATED)
    └── ru.json (UPDATED)
```

---

## 🧪 Локальное тестирование

1. **Запустить dev сервер:**

   ```bash
   npm run dev
   ```

2. **Перейти на страницу:**

   ```
   http://localhost:3000/en/nush
   ```

3. **Проверить:**
   - ✅ Заголовок отображается
   - ✅ Документы загружаются (если есть в Sanity)
   - ✅ Кнопки Preview и Download работают
   - ✅ Адаптивность на мобильных устройствах

---

## 📊 Сравнение: НУШ vs Portfolio vs Useful Links

| Функция        | Portfolio | Useful Links | НУШ |
| -------------- | --------- | ------------ | --- |
| Файлы          | ✅        | ✅           | ✅  |
| Preview PDF    | ✅        | ✅           | ✅  |
| Download       | ✅        | ✅           | ✅  |
| Многоязычность | ✅        | ✅           | ✅  |
| Адаптивность   | ✅        | ✅           | ✅  |

**Вывод**: НУШ следует идентичному паттерну Portfolio и Useful Links - доказанная архитектура.

---

**Версия**: 1.0  
**Дата обновления**: 2024-07-11  
**Статус**: Production Ready
