# 📚 Портфолио – Полное руководство администратора

## Обзор

Страница **"Мое портфолио"** позволяет полностью управлять контентом портфолио через **Sanity CMS** без необходимости редактирования кода. Администратор может добавлять, удалять и редактировать документы портфолио, изменять заголовки и подзаголовки прямо через интерфейс Sanity.

---

## 📋 Структура реализации

### Компоненты проекта

```
Sanity CMS (Backend)
├── Schema: Portfolio (новая)
├── Query: PORTFOLIO_QUERY
├── Functions:
│   ├── getPortfolioData()
│   ├── mapPortfolioData()
│
Next.js (Frontend)
├── Page: /[locale]/portfolio/page.js (новая)
├── Component: Portfolio/Portfolio.js (новая)
├── Styles: Portfolio/Portfolio.scss (новая)
│
Translations
├── messages/en.json (обновлено)
├── messages/uk.json (обновлено)
├── messages/ru.json (обновлено)
```

---

## 🔧 Инструкции для администратора Sanity

### Шаг 1: Создание записи Portfolio в Sanity

1. Откройте **Sanity Studio**
2. В левой панели найдите **"Portfolio"** или нажмите **"+ Create"**
3. Нажмите на **"Portfolio"** для создания новой записи

### Шаг 2: Заполнение основной информации

#### Поле "Section Title" (обязательное)

- **Английский**: "My Portfolio"
- **Украинский**: "Мое портфолио"
- **Русский**: "Мое портфолио"

#### Поле "Section Subtitle" (опциональное)

- Например: "Browse my collection of professional documents"

### Шаг 3: Добавление документов портфолио

1. Нажмите кнопку **"+ Add item"** в секции **"Portfolio Documents"**
2. Заполните поля для каждого документа:

#### 📄 Document Title (обязательное)

Название документа (многоязычное поле):

```
EN: "Project Report 2024"
UK: "Звіт про проект 2024"
RU: "Отчет о проекте 2024"
```

#### 📝 Document Description (опциональное)

Краткое описание (многоязычное поле):

```
EN: "Comprehensive analysis of Q1 performance metrics"
UK: "Комплексний аналіз показників 1 кварталу"
RU: "Комплексный анализ показателей 1 квартала"
```

#### 📎 Document File (обязательное)

1. Нажмите на поле **"Document File"**
2. Выберите или загрузите файл:
   - ✅ Поддерживаемые форматы: **PDF**, **DOC**, **DOCX**
   - ❌ Максимальный размер зависит от вашего плана Sanity

### Шаг 4: Опубликование

1. Убедитесь, что все обязательные поля заполнены (Title и хотя бы один документ)
2. Нажмите кнопку **"Publish"** в верхнем правом углу
3. Ждите подтверждения публикации

---

## 👀 Как выглядит портфолио на сайте

### Структура страницы

```
┌─────────────────────────────────────┐
│   "My Portfolio" (заголовок)        │
│   "Browse my documents" (подзагол)  │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐   │
│  │ 📄 Project Report 2024       │   │
│  │    Comprehensive analysis    │   │
│  │    PDF | report.pdf          │   │
│  │                              │   │
│  │  [Preview]  [Download]       │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │ 📘 Strategy Document         │   │
│  │    Planning guide 2024       │   │
│  │    Word | strategy.docx      │   │
│  │                              │   │
│  │              [Download]      │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Функциональность кнопок

#### 📄 PDF документы

- **[Preview]** - Открывает предпросмотр в новой вкладке браузера
- **[Download]** - Скачивает файл на компьютер

#### 📘 Word документы

- **[Download]** - Скачивает файл на компьютер
- **(Preview недоступен для Word документов)**

---

## 🔗 Добавление Portfolio в меню

### Через Sanity CMS

1. Откройте **Sanity Studio**
2. Найдите **"Menu Navigation"** в левой панели
3. Откройте существующую запись **"Menu Navigation"**
4. В секции **"Menu Items"** нажмите **"+ Add item"**

#### Заполнение элемента меню

| Поле      | Значение                                      |
| --------- | --------------------------------------------- |
| **Title** | "Portfolio" (многоязычное)                    |
| **Slug**  | `portfolio` (без пробелов, в нижнем регистре) |
| **Order** | _Номер позиции в меню_                        |

#### Пример:

```
Title:
  EN: "Portfolio"
  UK: "Портфолио"
  RU: "Портфолио"

Slug: portfolio
Order: 4
```

5. Нажмите **"Publish"**

### Результат

После публикации Portfolio появится в **Burger Menu** на сайте и пользователи смогут переходить на страницу `/portfolio` (или `/{locale}/portfolio`).

---

## ✅ Чек-лист администратора

- [ ] Создана запись **Portfolio** в Sanity
- [ ] Заполнены **Title** и **Subtitle** на английском, украинском, русском
- [ ] Добавлено минимум один документ портфолио
- [ ] Для каждого документа загружен файл (PDF/DOC/DOCX)
- [ ] Документы опубликованы
- [ ] Добавлена ссылка **Portfolio** в **Menu Navigation**
- [ ] Меню опубликовано
- [ ] Проверена страница портфолио на всех языках
- [ ] Проверены кнопки Preview (для PDF) и Download

---

## 🐛 Решение проблем

### Проблема: Портфолио не отображается на сайте

**Решение:**

1. Проверьте, опубликована ли запись Portfolio в Sanity
2. Убедитесь, что есть хотя бы один документ с загруженным файлом
3. Очистите кэш браузера (Ctrl+Shift+Delete)
4. Перезагрузите страницу

### Проблема: Файл не загружается

**Решение:**

1. Проверьте размер файла (должен быть разумным)
2. Убедитесь, что расширение .pdf, .doc или .docx
3. Попробуйте переименовать файл (удалите спецсимволы)
4. Проверьте соединение с интернетом

### Проблема: Кнопка Preview не работает для PDF

**Решение:**

1. Браузер должен поддерживать встроенный PDF viewer
2. Проверьте, что это действительно PDF файл
3. Попробуйте скачать файл вместо Preview

### Проблема: Переводы не отображаются правильно

**Решение:**

1. Убедитесь, что вы заполнили поля для всех языков (EN, UK, RU)
2. Переключитесь на нужный язык на сайте
3. Очистите кэш браузера

---

## 📝 Технические детали (для разработчиков)

### Интеграция с кодом

#### 1. Schema (Sanity)

```javascript
// sanity/schemaTypes/portfolio.js
- Type: document
- Fields: title (localeString), subtitle (localeString), documents (array)
- Document fields: title, description, file
```

#### 2. GROQ Query

```groq
*[_type == "portfolio"][0]{
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
}
```

#### 3. Frontend Routes

```
/portfolio → redirect to /{locale}/portfolio
/{locale}/portfolio → Page with Portfolio content
```

#### 4. Компонент

```javascript
// app/components/Portfolio/Portfolio.js
- Отображает документы в виде карточек
- Поддерживает Preview для PDF
- Поддерживает Download для всех файлов
```

---

## 🚀 Примеры использования

### Пример 1: Портфолио учителя

```
Title: My Teaching Portfolio
Documents:
  - Lesson Plans for Grade 5 (lesson-plans.pdf)
  - Student Assessment Reports (assessments.docx)
  - Professional Development Certificate (cert.pdf)
```

### Пример 2: Портфолио школьного проекта

```
Title: School Projects 2024
Documents:
  - STEM Project Report (stem-report.pdf)
  - Art Exhibition Catalog (catalog.pdf)
  - Community Service Initiative (service.docx)
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
