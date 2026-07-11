# 🔧 Корисні посилання – Техническая документация

## 📦 Что было создано

### 1. Sanity Schema (`sanity/schemaTypes/usefulLinks.js`)

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
      name: 'links',
      title: 'Useful Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'usefulLink',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Link Description (Optional)',
              type: 'localeText',
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'url',
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

#### USEFUL_LINKS_QUERY

```javascript
export const USEFUL_LINKS_QUERY = `*[_type == "usefulLinks"][0]{
  title,
  subtitle,
  links[]{
    title,
    description,
    url
  }
}`
```

#### getUsefulLinksData()

```javascript
export async function getUsefulLinksData() {
  if (!client) return null

  try {
    return await client.fetch(USEFUL_LINKS_QUERY)
  } catch (error) {
    console.error('Failed to fetch useful links data from Sanity:', error)
    return null
  }
}
```

#### mapUsefulLinksData()

```javascript
export function mapUsefulLinksData(data, locale) {
  if (!data?.links?.length) return null

  const links = data.links
    .map((link, index) => {
      if (!link.url) return null

      return {
        id: `link-${index}`,
        title: getLocalizedValue(link.title, locale),
        description: getLocalizedValue(link.description, locale),
        url: link.url,
      }
    })
    .filter(Boolean)

  if (!links.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    links,
  }
}
```

---

### 3. React Component (`app/components/UsefulLinks/UsefulLinks.js`)

**Основные функции:**

- Отображает полезные ссылки в виде карточек
- Показывает название и описание для каждой ссылки
- Кнопка "Go ↗" открывает ссылку в новой вкладке
- Полностью адаптивный дизайн
- Поддержка многоязычности через `useTranslations()`

**Props:**

```typescript
interface UsefulLinksProps {
  content: {
    title: string
    subtitle: string
    links: {
      id: string
      title: string
      description?: string
      url: string
    }[]
  }
}
```

---

### 4. Стили (`app/components/UsefulLinks/UsefulLinks.scss`)

**Особенности:**

- BEM методология (`.useful-links__...`)
- Полностью адаптивен (мобильный, планшет, десктоп)
- Hover эффекты на карточках
- CSS Grid и Flexbox для расположения
- Медиа-запросы для разных размеров

---

### 5. Next.js Page (`app/[locale]/useful-links/page.js`)

```javascript
export default async function UsefulLinksPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const usefulLinksData = await getUsefulLinksData()
  const content = mapUsefulLinksData(usefulLinksData, locale)

  return (
    <div>
      <UsefulLinks content={content} />
    </div>
  )
}
```

---

## 🛣️ Маршруты

| URL                                     | Описание                                             |
| --------------------------------------- | ---------------------------------------------------- |
| `http://localhost:3000/en/useful-links` | Useful Links на английском                           |
| `http://localhost:3000/uk/useful-links` | Useful Links на украинском                           |
| `http://localhost:3000/ru/useful-links` | Useful Links на русском                              |
| `/useful-links`                         | Автоматически редиректит на `/{locale}/useful-links` |

---

## 🔄 Поток данных

```
1. User navigates to /[locale]/useful-links
                    ↓
2. Next.js calls getUsefulLinksData()
                    ↓
3. Sanity GROQ Query fetches raw data
                    ↓
4. mapUsefulLinksData() transforms & localizes
                    ↓
5. UsefulLinks component receives props
                    ↓
6. Component renders HTML
                    ↓
7. Browser shows useful links page
```

---

## 📁 Структура файлов

```
teachers-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── usefulLinks.js (NEW)
│   │   └── index.js (UPDATED - импорт usefulLinks)
│   └── lib/
│       └── queries.js (UPDATED - добавлены функции)
│
├── app/
│   ├── components/
│   │   └── UsefulLinks/ (NEW)
│   │       ├── UsefulLinks.js
│   │       └── UsefulLinks.scss
│   │
│   └── [locale]/
│       └── useful-links/ (NEW)
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
   http://localhost:3000/en/useful-links
   ```

3. **Проверить:**
   - ✅ Заголовок отображается
   - ✅ Ссылки загружаются (если есть в Sanity)
   - ✅ Кнопка "Go" открывает в новой вкладке
   - ✅ Адаптивность на мобильных устройствах

---

## 🔐 Безопасность

### URL Validation

- Sanity автоматически валидирует URL через тип `url`
- Отклоняет невалидные адреса

### Link Opening

- Используется `window.open(url, '_blank', 'noopener,noreferrer')`
- Защита от атак через rel атрибуты

---

## 📚 Дополнительные ресурсы

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

**Версия**: 1.0  
**Последнее обновление**: 2024-07-11
