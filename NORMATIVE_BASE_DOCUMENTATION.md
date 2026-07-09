# Normative Base - Полная документация

## 📋 Структура и компоненты

### 1. **Sanity Schema** (`sanity/schemaTypes/normativeBase.js`)

Определяет структуру контента для Normative Base:

- `title` (localeString) - заголовок страницы
- `subtitle` (localeString) - подзаголовок страницы
- `documents` (array) - список документов

Каждый документ содержит:

- `title` (localeString) - название документа
- `description` (localeText) - опциональное описание
- `file` (file) - PDF, DOC или DOCX файл

### 2. **GROQ Queries** (`sanity/lib/queries.js`)

**NORMATIVE_BASE_QUERY:**

```
*[_type == "normativeBase"][0]{
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

**Функции:**

- `getNormativeBaseData()` - загружает данные из Sanity
- `mapNormativeBaseData(data, locale)` - трансформирует данные для компонента

### 3. **React Component** (`app/components/NormativeBase/NormativeBase.js`)

**Возможности:**

- ✅ Отображение списка документов в виде карточек
- ✅ Автоматическое определение типа файла (PDF, Word)
- ✅ Кнопка "Preview" для PDF документов (открывает в браузере)
- ✅ Кнопка "Download" для скачивания
- ✅ Отображение названия файла и расширения
- ✅ Опциональное описание документа
- ✅ Полностью адаптивный дизайн

**Props:**

```javascript
{
  content: {
    title: string,
    subtitle: string,
    documents: [
      {
        id: string,
        title: string,
        description: string,
        fileName: string,
        fileExtension: string,
        fileUrl: string,
        fileType: 'pdf' | 'word'
      }
    ]
  }
}
```

### 4. **Page Route** (`app/[locale]/normative-base/page.js`)

Страница поддерживает:

- 🌍 Мультиязычность (uk, ru, en)
- 📱 Полную адаптивность
- ⚡ Server-side rendering для SEO
- 🔄 Динамическую загрузку данных из Sanity

### 5. **Translations** (`messages/*.json`)

**English:**

```json
"NormativeBase": {
  "title": "Normative Base",
  "subtitle": "Access regulatory and legal documents",
  "preview": "Preview",
  "download": "Download",
  "noDocuments": "No documents available"
}
```

**Russian:**

```json
"NormativeBase": {
  "title": "Нормативная база",
  "subtitle": "Доступ к нормативным и правовым документам",
  "preview": "Просмотр",
  "download": "Скачать",
  "noDocuments": "Документы недоступны"
}
```

**Ukrainian:**

```json
"NormativeBase": {
  "title": "Нормативна база",
  "subtitle": "Доступ до нормативних та правових документів",
  "preview": "Переглянути",
  "download": "Завантажити",
  "noDocuments": "Документи недоступні"
}
```

### 6. **Styling** (`app/components/NormativeBase/NormativeBase.scss`)

**Особенности:**

- 📱 Адаптивная сетка (мобила/планшет/ПК)
- 🎨 Консистентный дизайн с проектом
- ✨ Hover эффекты и анимации
- 📦 BEM методология
- 🎯 Оптимизировано для всех размеров экранов

## 🌐 URL и маршруты

```
/en/normative-base     - English version
/ru/normative-base     - Russian version
/uk/normative-base     - Ukrainian version
```

## 👨‍💼 Администратору в Sanity

### Как добавить документы:

1. **Перейдите в Sanity Studio**
2. **Создайте новый документ типа "Normative Base"** (или найдите существующий)
3. **Заполните поля:**
   - **Section Title** (en/ru/uk) - название страницы
   - **Section Subtitle** (en/ru/uk) - подзаголовок страницы
   - **Documents** - кликните "Add" для добавления документа

### Для каждого документа:

1. **Document Title** (en/ru/uk) - название документа
2. **Document Description** (en/ru/uk) - опциональное описание
3. **Document File** - загрузите PDF, DOC или DOCX файл

### Действия с документами:

- ✅ **Добавить** - кликните "Add" в массиве documents
- ✅ **Редактировать** - кликните на документ и измените данные
- ✅ **Удалить** - кликните иконку удаления
- ✅ **Переупорядочить** - перетащите документы в нужном порядке

## 🔧 Техническая информация

### Файлы проекта:

```
sanity/schemaTypes/normativeBase.js     ← Schema определение
sanity/schemaTypes/index.js             ← Регистрация schema
sanity/lib/queries.js                   ← GROQ запросы и функции
app/components/NormativeBase/
  ├── NormativeBase.js                  ← React компонент
  └── NormativeBase.scss                ← Стили
app/[locale]/normative-base/
  └── page.js                           ← Страница маршрута
messages/
  ├── en.json                           ← Английские переводы
  ├── ru.json                           ← Русские переводы
  └── uk.json                           ← Украинские переводы
```

### Типы файлов:

- ✅ **PDF** (.pdf) - полная поддержка предпросмотра
- ✅ **Word** (.doc, .docx) - поддержка скачивания

### Размер файлов:

- Рекомендуется: < 10 MB на файл
- Санити поддерживает до 2 GB на файл
- Оптимальный размер: 1-5 MB для быстрой загрузки

## 💡 Особенности и возможности

### ✅ Что реализовано:

1. **Полностью управляется через Sanity CMS** - нет статических данных
2. **Мультиязычная поддержка** - uk/ru/en
3. **Адаптивный дизайн** - работает на всех устройствах
4. **Автоматическое определение типа файла** - правильные иконки и действия
5. **Предпросмотр PDF** - открывается в браузере
6. **Скачивание документов** - для всех типов файлов
7. **Неограниченное количество документов** - автоматически масштабируется
8. **Консистентный дизайн** - совпадает с остальным проектом

### 🚀 Производительность:

- Server-side rendering (SSR) для быстрой загрузки
- Оптимизированные стили (SCSS)
- Минимум JavaScript логики
- Асинхронная загрузка данных

### 🔒 Безопасность:

- Файлы хранятся в Sanity (зашифрованы)
- Прямые ссылки на файлы защищены Sanity
- No файловая система на сервере

## 📝 Примеры использования

### Пример структуры в Sanity:

```
Normative Base
├── Title: "Normative Base" (en)
│              "Нормативная база" (ru)
│              "Нормативна база" (uk)
│
├── Subtitle: "Access regulatory and legal documents" (en)
│
└── Documents:
    ├── Document 1:
    │   ├── Title: "Charter of School" (en)
    │   ├── Description: "Main regulatory document of our school"
    │   └── File: charter.pdf
    │
    ├── Document 2:
    │   ├── Title: "Internal Regulations" (en)
    │   ├── Description: "Rules and procedures for students"
    │   └── File: regulations.docx
    │
    └── Document 3:
        ├── Title: "Code of Conduct" (en)
        └── File: conduct.pdf
```

## 🆘 Решение проблем

### Документы не отображаются:

1. Проверьте, что создан документ типа "Normative Base" в Sanity
2. Убедитесь, что заполнены поля title и documents
3. Проверьте, что файлы успешно загружены в Sanity

### Файл не скачивается:

1. Проверьте URL файла в Sanity
2. Убедитесь, что файл не превышает размер ограничения
3. Проверьте консоль браузера на ошибки

### Предпросмотр PDF не работает:

1. Это работает только для PDF файлов
2. Браузер должен поддерживать встроенное отображение PDF
3. Файл должен быть валидным PDF документом

## 📞 Контакт

Для вопросов по внедрению или модификации функционала напишите разработчику.

---

**Дата создания:** July 8, 2026
**Статус:** ✅ Production Ready
**Версия:** 1.0
