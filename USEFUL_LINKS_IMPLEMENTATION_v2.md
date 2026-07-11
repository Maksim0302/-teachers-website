# 🔧 Корисні файли – Техническая документация v2.0

## 📦 Что было изменено

### Schema Update (`sanity/schemaTypes/usefulLinks.js`)

**Было**: URL ссылки  
**Стало**: Файлы (PDF/Word)

```javascript
export default {
  name: 'usefulLinks',
  title: 'Useful Links',
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
      name: 'files', // ← было "links"
      title: 'Useful Files',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'usefulFile', // ← было "usefulLink"
          fields: [
            {
              name: 'title',
              title: 'File Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'File Description (Optional)',
              type: 'localeText',
            },
            {
              name: 'file', // ← ВСЁ ИЗМЕНЕНО: было "url"
              title: 'File',
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
                title: title || 'Untitled File',
                subtitle: fileName || 'No file',
              }
            },
          },
        },
      ],
    },
  ],
}
```

---

### GROQ Query (`sanity/lib/queries.js`)

**Было**: Запрос простых URL полей  
**Стало**: Запрос файлов с asset информацией

```javascript
export const USEFUL_LINKS_QUERY = `*[_type == "usefulLinks"][0]{
  title,
  subtitle,
  files[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  }
}
```

---

### Data Mapping (`sanity/lib/queries.js`)

**Было**: Простое копирование URL  
**Стало**: Преобразование файлов с определением типа

```javascript
export function mapUsefulLinksData(data, locale) {
  if (!data?.files?.length) return null

  const files = data.files
    .map((file, index) => {
      if (!file.file?.asset?.url) return null

      const fileUrl = file.file.asset.url
      const fileName = file.file.asset.originalFilename || ''
      const fileExtension = fileName.split('.').pop().toLowerCase()

      return {
        id: `file-${index}`,
        title: getLocalizedValue(file.title, locale),
        description: getLocalizedValue(file.description, locale),
        fileUrl,
        fileName,
        fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!files.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents: files, // ← было "links"
  }
}
```

---

### Component (`app/components/UsefulLinks/UsefulLinks.js`)

**Было**: Кнопка "Go ↗" открывает URL в новой вкладке  
**Стало**: Две кнопки "Preview" (PDF) и "Download"

```javascript
const getFileIcon = (fileType) => {
  if (fileType === 'pdf') {
    return '📄'
  }
  return '📘'
}

const handlePreview = (fileUrl, fileExtension) => {
  if (fileExtension === 'pdf') {
    window.open(fileUrl, '_blank')
    return
  }
  handleDownload(fileUrl, '')
}

const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName || 'document'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Render:
;<div className="useful-links__buttons">
  {doc.fileType === 'pdf' && (
    <button
      className="useful-links__button useful-links__button--preview"
      onClick={() => handlePreview(doc.fileUrl, doc.fileType)}
    >
      {t('preview')}
    </button>
  )}
  <button
    className="useful-links__button useful-links__button--download"
    onClick={() => handleDownload(doc.fileUrl, doc.fileName)}
  >
    {t('download')}
  </button>
</div>
```

---

### Translations

**Было**:

```json
"UsefulLinks": {
  "button": "Go",
  "buttonTitle": "Open link in new tab",
  "noLinks": "No links available"
}
```

**Стало**:

```json
"UsefulLinks": {
  "preview": "Preview",
  "download": "Download",
  "noFiles": "No files available"
}
```

---

## 🎯 Ключевые изменения

| Аспект       | Было         | Стало                              |
| ------------ | ------------ | ---------------------------------- |
| Тип данных   | URL строка   | Файл (asset)                       |
| Поле схемы   | `url`        | `file`                             |
| Поле массива | `links`      | `files`                            |
| GROQ fetch   | url          | file.asset.{originalFilename, url} |
| Компонент    | Открытие URL | Preview + Download                 |
| Иконка       | Нет          | 📄 PDF / 📘 Word                   |
| Кнопка       | "Go ↗"       | "Preview" / "Download"             |
| Color        | Синяя        | Зелёная / Синяя                    |

---

## 🔄 Поток данных

```
1. Admin загружает файл в Sanity
                    ↓
2. File сохраняется в Sanity Assets
                    ↓
3. GROQ Query получает file.asset.url и originalFilename
                    ↓
4. mapUsefulLinksData() определяет тип (pdf/word)
                    ↓
5. Component показывает Preview (для PDF) или Download
                    ↓
6. Пользователь кликает на Preview/Download
                    ↓
7. Browser открывает PDF или скачивает файл
```

---

## 📱 UI компоненты

### Desktop (>1024px)

```
┌────────────────────────────────────────┐
│ 📄 Document Title                      │
│    Document description                │
│    PDF  document.pdf                   │
│                          [Preview] [↓] │
└────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌──────────────────────────┐
│ 📄 Document Title        │
│    Document description  │
│    PDF  document.pdf     │
│ [Preview]  [Download]    │
└──────────────────────────┘
```

---

## 🔐 Безопасность

✅ File type валидация в Sanity (.pdf, .doc, .docx)  
✅ Asset URL генерируется Sanity  
✅ Download использует native browser API  
✅ Preview открывает в новой вкладке

---

## 📊 Сравнение: Старая vs Новая версия

| Функция          | v1.0 (Links) | v2.0 (Files)   |
| ---------------- | ------------ | -------------- |
| Добавление URL   | ✅           | ❌             |
| Загрузка файлов  | ❌           | ✅             |
| Preview PDF      | ❌           | ✅             |
| Download файлов  | ❌           | ✅             |
| Определение типа | ❌           | ✅             |
| Иконки файлов    | ❌           | ✅             |
| Meta информация  | ❌           | ✅ (имя файла) |

---

**Версия**: 2.0  
**Дата обновления**: 2024-07-11  
**Статус**: Production Ready
