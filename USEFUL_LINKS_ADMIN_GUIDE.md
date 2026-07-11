# 🔗 Корисні посилання – Полное руководство администратора

## Обзор

Страница **"Корисні посилання"** позволяет полностью управлять коллекцией полезных ссылок через **Sanity CMS** без необходимости редактирования кода. Администратор может добавлять, удалять и редактировать ссылки прямо через интерфейс Sanity.

---

## 📋 Структура реализации

### Компоненты проекта

```
Sanity CMS (Backend)
├── Schema: UsefulLinks (новая)
├── Query: USEFUL_LINKS_QUERY
├── Functions:
│   ├── getUsefulLinksData()
│   ├── mapUsefulLinksData()
│
Next.js (Frontend)
├── Page: /[locale]/useful-links/page.js (новая)
├── Component: UsefulLinks/UsefulLinks.js (новая)
├── Styles: UsefulLinks/UsefulLinks.scss (новая)
│
Translations
├── messages/en.json (обновлено)
├── messages/uk.json (обновлено)
├── messages/ru.json (обновлено)
```

---

## 🔧 Инструкции для администратора Sanity

### Шаг 1: Создание записи Useful Links в Sanity

1. Откройте **Sanity Studio**
2. В левой панели найдите **"Useful Links"** или нажмите **"+ Create"**
3. Нажмите на **"Useful Links"** для создания новой записи

### Шаг 2: Заполнение основной информации

#### Поле "Section Title" (обязательное)

- **Английский**: "Useful Links"
- **Украинский**: "Корисні посилання"
- **Русский**: "Полезные ссылки"

#### Поле "Section Subtitle" (опциональное)

- Например: "Collection of helpful resources and references"

### Шаг 3: Добавление полезных ссылок

1. Нажмите кнопку **"+ Add item"** в секции **"Useful Links"**
2. Заполните поля для каждой ссылки:

#### 🔗 Link Title (обязательное)

Название ссылки (многоязычное поле):

```
EN: "Google"
UK: "Гугл"
RU: "Гугл"
```

#### 📝 Link Description (опциональное)

Краткое описание (многоязычное поле):

```
EN: "Search engine"
UK: "Пошукова система"
RU: "Поисковая система"
```

#### 🌐 Link URL (обязательное)

Полный URL адрес:

```
https://www.google.com
https://wikipedia.org
https://www.khanacademy.org
```

### Шаг 4: Опубликование

1. Убедитесь, что все обязательные поля заполнены (Title и хотя бы одна ссылка)
2. Нажмите кнопку **"Publish"** в верхнем правом углу
3. Ждите подтверждения публикации

---

## 👀 Как выглядит на сайте

### Структура страницы

```
┌─────────────────────────────────────┐
│   "Useful Links" (заголовок)        │
│   "Browse resources" (подзагол)     │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐   │
│  │ Google                       │   │
│  │    Search engine             │   │
│  │    https://google.com        │   │
│  │                              │   │
│  │              [Go →]          │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │ Wikipedia                    │   │
│  │    Online encyclopedia       │   │
│  │    https://wikipedia.org     │   │
│  │                              │   │
│  │              [Go →]          │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Функциональность кнопок

#### [Go →] кнопка

- Открывает ссылку в **новой вкладке**
- Безопасно: использует `noopener,noreferrer` для защиты

---

## 🔗 Добавление Useful Links в меню

### Через Sanity CMS

1. Откройте **Sanity Studio**
2. Найдите **"Menu Navigation"** в левой панели
3. Откройте существующую запись **"Menu Navigation"**
4. В секции **"Menu Items"** нажмите **"+ Add item"**

#### Заполнение элемента меню

| Поле      | Значение                                         |
| --------- | ------------------------------------------------ |
| **Title** | "Useful Links" (многоязычное)                    |
| **Slug**  | `useful-links` (без пробелов, в нижнем регистре) |
| **Order** | _Номер позиции в меню_                           |

#### Пример:

```
Title:
  EN: "Useful Links"
  UK: "Корисні посилання"
  RU: "Полезные ссылки"

Slug: useful-links
Order: 5
```

5. Нажмите **"Publish"**

### Результат

После публикации Useful Links появится в **Burger Menu** на сайте и пользователи смогут переходить на страницу `/useful-links`.

---

## ✅ Чек-лист администратора

- [ ] Создана запись **Useful Links** в Sanity
- [ ] Заполнены **Title** и **Subtitle** на английском, украинском, русском
- [ ] Добавлено минимум одна ссылка
- [ ] Для каждой ссылки заполнены название и URL
- [ ] Ссылки опубликованы
- [ ] Добавлена ссылка **Useful Links** в **Menu Navigation**
- [ ] Меню опубликовано
- [ ] Проверена страница на всех языках
- [ ] Проверены кнопки "Go"

---

## 🐛 Решение проблем

### Проблема: Ссылки не отображаются на сайте

**Решение:**

1. Проверьте, опубликована ли запись Useful Links в Sanity
2. Убедитесь, что есть хотя бы одна ссылка с URL
3. Очистите кэш браузера (Ctrl+Shift+Delete)
4. Перезагрузите страницу

### Проблема: Ссылка не открывается

**Решение:**

1. Убедитесь, что URL правильный (начинается с http:// или https://)
2. Проверьте, что URL не содержит опечаток
3. Попробуйте открыть URL в адресной строке напрямую

### Проблема: Кнопка не работает

**Решение:**

1. Браузер должен позволять открывать ссылки в новых вкладках
2. Проверьте, что JavaScript включен
3. Попробуйте в другом браузере

### Проблема: Переводы не отображаются правильно

**Решение:**

1. Убедитесь, что вы заполнили поля для всех языков (EN, UK, RU)
2. Переключитесь на нужный язык на сайте
3. Очистите кэш браузера

---

## 📝 Технические детали (для разработчиков)

### 1. Schema (Sanity)

```javascript
// sanity/schemaTypes/usefulLinks.js
- Type: document
- Fields: title (localeString), subtitle (localeString), links (array)
- Link fields: title, description, url
```

### 2. GROQ Query

```groq
*[_type == "usefulLinks"][0]{
  title,
  subtitle,
  links[]{
    title,
    description,
    url
  }
}
```

### 3. Frontend Routes

```
/useful-links → redirect to /{locale}/useful-links
/{locale}/useful-links → Page with Useful Links content
```

---

## 🚀 Примеры использования

### Пример 1: Образовательные ресурсы

```
Title: Educational Resources
Links:
  - Khan Academy (https://www.khanacademy.org)
  - Google Scholar (https://scholar.google.com)
  - Wikipedia (https://en.wikipedia.org)
```

### Пример 2: Инструменты и сервисы

```
Title: Useful Tools
Links:
  - Google Drive (https://drive.google.com)
  - Canva (https://canva.com)
  - Figma (https://www.figma.com)
```

---

## 📞 Поддержка

Если у вас есть вопросы:

1. Проверьте этот документ еще раз
2. Посетите документацию Sanity: https://www.sanity.io/docs
3. Свяжитесь с вашим разработчиком

---

**Дата последнего обновления**: 2024-07-11  
**Версия**: 1.0
