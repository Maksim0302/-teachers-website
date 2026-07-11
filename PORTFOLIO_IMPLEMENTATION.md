# 🔧 Портфолио – Техническая документация

## 📦 Что было создано

### 1. Sanity Schema (`sanity/schemaTypes/portfolio.js`)

```javascript
export default {
  name: 'portfolio',
  title: 'Portfolio',
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
      title: 'Portfolio Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'portfolioDocument',
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
          preview: {
            select: {
              title: 'title.en',
              fileName: 'file.originalFilename',
            },
            prepare({ title, fileName }) {
              return {
                title: title || 'Untitled Document',
                subtitle: fileName || 'No file',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Portfolio',
      }
    },
  },
}
```

**Возможности:**

- ✅ Многоязычные заголовки и подзаголовки (localeString)
- ✅ Массив документов с неограниченным количеством
- ✅ Поддержка PDF, DOC, DOCX файлов
- ✅ Опциональное описание для каждого документа
- ✅ Встроенный preview в Sanity Studio

---

### 2. GROQ Query и Data Functions (`sanity/lib/queries.js`)

#### PORTFOLIO_QUERY

```javascript
export const PORTFOLIO_QUERY = `*[_type == "portfolio"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        url,
        originalFilename
      }
    }
  }
}`
```

#### getPortfolioData()

```javascript
export async function getPortfolioData() {
  if (!client) return null

  try {
    return await client.fetch(PORTFOLIO_QUERY)
  } catch (error) {
    console.error('Failed to fetch portfolio data from Sanity:', error)
    return null
  }
}
```

#### mapPortfolioData()

```javascript
export function mapPortfolioData(data, locale) {
  if (!data?.documents?.length) return null

  const documents = data.documents
    .map((doc, index) => {
      if (!doc.file?.asset?.url) return null

      const fileName = doc.file.asset.originalFilename || 'document'
      const fileExtension = fileName.split('.').pop().toLowerCase()
      const fileUrl = doc.file.asset.url

      return {
        id: `portfolio-doc-${index}`,
        title: getLocalizedValue(doc.title, locale),
        description: getLocalizedValue(doc.description, locale),
        fileName,
        fileExtension,
        fileUrl,
        fileType: ['pdf'].includes(fileExtension) ? 'pdf' : 'word',
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

**Логика:**

- Извлекает данные из Sanity с помощью GROQ
- Трансформирует данные для фронтенда
- Определяет тип файла (PDF или Word)
- Возвращает локализованные значения для указанного языка

---

### 3. React Component (`app/components/Portfolio/Portfolio.js`)

**Файл компонента**: `app/components/Portfolio/Portfolio.js`

**Основные функции:**

- Отображает портфолио в виде карточек документов
- Показывает иконки в зависимости от типа файла (📄 PDF, 📘 Word)
- Кнопка "Preview" для PDF документов
- Кнопка "Download" для всех документов
- Полностью адаптивный дизайн (мобильный, планшет, десктоп)
- Поддержка многоязычности через `useTranslations()`

**Props:**

```typescript
interface PortfolioProps {
  content: {
    title: string
    subtitle: string
    documents: {
      id: string
      title: string
      description?: string
      fileName: string
      fileExtension: string
      fileUrl: string
      fileType: 'pdf' | 'word'
    }[]
  }
}
```

**Компонент включает:**

- Заголовок секции
- Подзаголовок (опциональный)
- Список документов в виде карточек
- Иконка типа файла
- Название и описание документа
- Метаинформация (тип файла, имя файла)
- Кнопки действий (Preview/Download)
- Сообщение "нет документов" если список пустой

---

### 4. Стили (`app/components/Portfolio/Portfolio.scss`)

**Файл**: `app/components/Portfolio/Portfolio.scss`

**Особенности стилей:**

- Использует BEM методологию (`.portfolio__...`)
- Полностью адаптивен (мобильный, планшет, десктоп)
- Анимации при наведении (hover эффекты)
- CSS Grid для расположения
- Flexbox для выравнивания элементов
- Переменные цвета и отступы для консистентности

**Медиа-запросы:**

- `max-width: 768px` - мобильные устройства
- `min-width: 1024px` - планшеты
- `min-width: 1280px` - десктопы

---

### 5. Next.js Page (`app/[locale]/portfolio/page.js`)

```javascript
import { getPortfolioData, mapPortfolioData } from '@/sanity/lib/queries'
import Portfolio from '@/app/components/Portfolio/Portfolio'

export const metadata = {
  title: 'Portfolio | Educational Portal',
  description: 'Browse our portfolio documents',
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const portfolioData = await getPortfolioData()
  const content = mapPortfolioData(portfolioData, locale)

  return (
    <div>
      <Portfolio content={content} />
    </div>
  )
}
```

**Особенности:**

- Server-side страница (async component)
- Автоматическая локализация через параметр `locale`
- SEO оптимизация через metadata
- Fetchит данные из Sanity при каждом запросе
- Трансформирует данные перед передачей в компонент

---

### 6. Переводы

#### `messages/en.json`

```json
"Portfolio": {
  "title": "My Portfolio",
  "subtitle": "Browse my portfolio documents",
  "preview": "Preview",
  "download": "Download",
  "noDocuments": "No documents available"
}
```

#### `messages/uk.json`

```json
"Portfolio": {
  "title": "Мое портфолио",
  "subtitle": "Переглянути мої документи портфоліо",
  "preview": "Переглянути",
  "download": "Завантажити",
  "noDocuments": "Документи недоступні"
}
```

#### `messages/ru.json`

```json
"Portfolio": {
  "title": "Мое портфолио",
  "subtitle": "Просмотрите мои документы портфолио",
  "preview": "Просмотр",
  "download": "Скачать",
  "noDocuments": "Документы недоступны"
}
```

---

## 🛣️ Маршруты

| URL                                  | Описание                                          |
| ------------------------------------ | ------------------------------------------------- |
| `http://localhost:3000/en/portfolio` | Portfolio на английском                           |
| `http://localhost:3000/uk/portfolio` | Portfolio на украинском                           |
| `http://localhost:3000/ru/portfolio` | Portfolio на русском                              |
| `/portfolio`                         | Автоматически редиректит на `/{locale}/portfolio` |

---

## 🔄 Поток данных

```
1. User navigates to /[locale]/portfolio
                    ↓
2. Next.js calls getPortfolioData()
                    ↓
3. Sanity GROQ Query fetches raw data
                    ↓
4. mapPortfolioData() transforms & localizes
                    ↓
5. Portfolio component receives props
                    ↓
6. Component renders HTML
                    ↓
7. Browser shows portfolio page
```

---

## 📁 Структура файлов

```
teachers-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── portfolio.js (NEW)
│   │   └── index.js (UPDATED - импорт portfolio)
│   └── lib/
│       └── queries.js (UPDATED - добавлены функции)
│
├── app/
│   ├── components/
│   │   └── Portfolio/ (NEW)
│   │       ├── Portfolio.js
│   │       └── Portfolio.scss
│   │
│   └── [locale]/
│       └── portfolio/ (NEW)
│           └── page.js
│
└── messages/
    ├── en.json (UPDATED)
    ├── uk.json (UPDATED)
    └── ru.json (UPDATED)
```

---

## 🧪 Тестирование

### Локальное тестирование

1. **Запустить dev сервер:**

   ```bash
   npm run dev
   ```

2. **Перейти на странцу:**

   ```
   http://localhost:3000/en/portfolio
   ```

3. **Проверить:**
   - ✅ Заголовок отображается
   - ✅ Подзаголовок отображается
   - ✅ Документы загружаются (если есть в Sanity)
   - ✅ Иконки файлов правильные
   - ✅ Кнопки Preview и Download работают
   - ✅ Адаптивность на мобильных устройствах

### Production тестирование

1. **Собрать проект:**

   ```bash
   npm run build
   ```

2. **Запустить production версию:**

   ```bash
   npm run start
   ```

3. **Проверить:**
   - ✅ Нет ошибок при загрузке
   - ✅ Данные загружаются корректно
   - ✅ Производительность нормальная

---

## 🔧 Расширение функциональности

### Добавить фильтрацию по типу файла

```javascript
const [filterType, setFilterType] = useState('all')

const filteredDocuments =
  filterType === 'all'
    ? documents
    : documents.filter((doc) => doc.fileType === filterType)
```

### Добавить сортировку

```javascript
const sortedDocuments = [...documents].sort((a, b) =>
  a.title.localeCompare(b.title)
)
```

### Добавить поиск

```javascript
const [searchQuery, setSearchQuery] = useState('')

const searchedDocuments = documents.filter((doc) =>
  doc.title.toLowerCase().includes(searchQuery.toLowerCase())
)
```

### Добавить категории документов

Добавить в schema:

```javascript
{
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: ['Reports', 'Certificates', 'Projects'],
  },
}
```

---

## 📊 Performance Tips

1. **Image Optimization**: Используется встроенный Sanity image builder
2. **Lazy Loading**: Документы загружаются по запросу
3. **Caching**: Next.js кэширует статические страницы
4. **File Compression**: Sanity автоматически оптимизирует файлы

---

## 🐛 Known Issues & Workarounds

### Issue: PDF Preview не работает в Safari

**Workaround**: Используйте Firefox, Chrome или Edge для preview

### Issue: Большие файлы загружаются долго

**Workaround**: Сжимайте PDF перед загрузкой в Sanity

### Issue: Document title обрезается на мобильных

**Workaround**: Используйте более короткие названия

---

## 📚 Дополнительные ресурсы

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

**Версия**: 1.0  
**Последнее обновление**: 2024-07-11  
**Автор**: Development Team
