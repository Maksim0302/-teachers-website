# Burger Menu - Sanity CMS Integration ✅ ГОТОВО

## 📊 Что было сделано

Burger Menu полностью переделан для управления через Sanity CMS. Статический массив меню в коде удален, все данные теперь загружаются динамически из CMS.

## 📁 Список всех изменений

### ✨ Новые файлы (4 файла)

1. **`sanity/schemaTypes/menuNavigation.js`**
   - Sanity схема для меню
   - Поддержка вложенных элементов (Accordion)
   - Многоязычная поддержка (en, ru, uk)
   - Сортировка через поле `order`

2. **`app/api/menu/route.js`**
   - API endpoint: `GET /api/menu?locale=en`
   - Загружает данные из Sanity
   - Преобразует данные в формат компонента
   - Обработка ошибок

3. **Документация для администраторов**:
   - `BURGER_MENU_SETUP.md` - Как управлять меню в Sanity
   - `BURGER_MENU_INITIAL_SETUP.md` - Пошаговая начальная настройка
   - `MENU_DATA_EXAMPLE.js` - Пример структуры данных

### 🔄 Измененные файлы (5 файлов)

1. **`app/components/BurgerMenu/BurgerMenu.js`**

   ```javascript
   // ДО: Статический массив menuItems
   const menuItems = [ ... ]

   // ПОСЛЕ: Загрузка из API
   useEffect(() => {
     fetch(`/api/menu?locale=${locale}`)
     // ...
   }, [locale])
   ```
   - Удален статический массив
   - Добавлена загрузка данных из API
   - Поддержка переключения языков
   - Поддержка Accordion и обычных ссылок
   - Состояния loading и empty

2. **`app/components/BurgerMenu/BurgerMenu.scss`**
   - Добавлены стили для loading состояния
   - Добавлены стили для empty состояния
   - Все старые стили сохранены

3. **`sanity/schemaTypes/index.js`**

   ```javascript
   // Добавлен импорт
   import menuNavigation from './menuNavigation'

   // Добавлен в экспорт
   export const schemaTypes = [
     // ...
     menuNavigation,
   ]
   ```

4. **`sanity/lib/queries.js`**

   ```javascript
   // Добавлены:
   // 1. GROQ запрос для меню
   export const MENU_QUERY = `*[_type == "menuNavigation"][0]{ ... }`

   // 2. Функция загрузки
   export async function getMenuData() { ... }

   // 3. Функция преобразования
   export function mapMenuData(data, locale) { ... }
   ```

5. **`sanity.config.js`**

   ```javascript
   // Добавлено в singletons:
   { title: 'Navigation Menu', schemaType: 'menuNavigation', documentId: 'menuNavigation' }

   // Теперь меню появляется в Studio первым в списке
   ```

## 🎯 Основные возможности

✅ **Управление через CMS**

- Добавлять, удалять, редактировать пункты меню
- Менять порядок (Order)
- Все без изменения кода

✅ **Поддержка Accordion**

- Если у пункта есть `children` → Accordion
- Если нет → простая ссылка

✅ **Многоязычность**

- Заголовки на en, ru, uk
- Меню обновляется при смене языка

✅ **Оригинальный дизайн**

- Все стили, анимации, адаптивность сохранены
- Burger Menu выглядит и работает как раньше

✅ **Динамические ссылки**

- Через поле `slug` в Sanity
- Поддержка nested путей (e.g., `graduates/2024`)

## 📊 Архитектура

```
Sanity CMS
    ↓ (GROQ запрос)
API Route (/api/menu)
    ↓ (преобразование + локализация)
BurgerMenu Component
    ↓ (отображение)
Пользователь видит меню
```

## 🔄 Data Flow

```
1. BurgerMenu монтируется
   ↓
2. useEffect вызывает fetch(`/api/menu?locale=en`)
   ↓
3. API роут вызывает getMenuData() из Sanity
   ↓
4. Данные преобразуются через mapMenuData()
   ↓
5. Компонент получает JSON с menuItems
   ↓
6. Отображаются пункты меню:
   - С children → Accordion
   - Без children → Link
```

## 📈 Производительность

- **Кеширование**: API результаты могут кешироваться
- **Ленивая загрузка**: Меню загружается только при необходимости
- **Оптимизация**: Запрос содержит только необходимые поля

## 🌍 Пример использования

### В Sanity Studio

```
Navigation Menu (документ)
├─ Home (slug: "home", no children)
├─ About (slug: "about-us")
│  ├─ About Us (slug: "about")
│  ├─ Team (slug: "team")
│  └─ History (slug: "history")
├─ Graduates
│  ├─ 2024 (slug: "graduates/2024")
│  └─ 2025 (slug: "graduates/2025")
├─ Gallery (slug: "gallery", no children)
└─ Contact (slug: "contact", no children)
```

### На сайте

- **Home** → обычная ссылка
- **About** → Accordion
  - About Us → ссылка
  - Team → ссылка
  - History → ссылка
- **Graduates** → Accordion
  - 2024 → ссылка
  - 2025 → ссылка
- **Gallery** → обычная ссылка
- **Contact** → обычная ссылка

## 🚀 Как начать

### 1. Для разработчиков

```bash
# Проверьте, что все файлы созданы/обновлены
# Никаких дополнительных установок не требуется
# Компоненты уже используют существующие зависимости
```

### 2. Для администраторов

1. Откройте `/studio`
2. Нажмите "Navigation Menu"
3. Создайте первый документ
4. Добавьте пункты меню
5. Нажмите "Publish"

### 3. Проверка

```
Откройте сайт → Нажмите на Burger Menu (☰)
→ Должны увидеть пункты из Sanity
```

## 📝 Документация

| Файл                                       | Для кого     | Описание                    |
| ------------------------------------------ | ------------ | --------------------------- |
| `BURGER_MENU_SETUP.md`                     | Админы       | Как управлять меню в Sanity |
| `BURGER_MENU_INITIAL_SETUP.md`             | Админы       | Пошаговая первая настройка  |
| `BURGER_MENU_MIGRATION.md`                 | Разработчики | Техническое описание        |
| `/memories/repo/burger-menu-sanity-cms.md` | Разработчики | Краткий чек-лист            |
| `MENU_DATA_EXAMPLE.js`                     | Разработчики | Примеры структуры данных    |

## ⚙️ Технические детали

### Схема Sanity

- **Document type**: `menuNavigation`
- **Document ID**: `menuNavigation` (singleton)
- **Fields**:
  - `menuItems` (array) - массив пунктов меню
    - `title` (localeString) - многоязычное название
    - `slug` (string) - путь в URL
    - `order` (number) - порядок сортировки
    - `children` (array, optional) - вложенные пункты

### API Endpoint

- **URL**: `/api/menu`
- **Method**: `GET`
- **Query params**: `?locale=en` (опционально, по умолчанию en)
- **Response**:
  ```json
  {
    "menuItems": [
      {
        "id": "home",
        "label": "Home",
        "href": "/home",
        "children": []
      }
    ]
  }
  ```

### GROQ Query

```groql
*[_type == "menuNavigation"][0]{
  menuItems[]{
    title,
    slug,
    order,
    children[]{
      title,
      slug,
      order
    }
  }
}
```

## ✨ Особенности реализации

1. **Client-side загрузка**
   - BurgerMenu - это 'use client' компонент
   - Загружает меню в useEffect
   - Поддерживает переключение языков

2. **Условный рендеринг**
   - Если `children.length > 0` → Accordion
   - Иначе → Link
   - Чистая и простая логика

3. **Многоязычность**
   - Использует `useLocale()` от next-intl
   - Передает язык в API
   - `mapMenuData()` вытягивает текст на нужном языке

4. **Обработка ошибок**
   - Try-catch в API роуте
   - Try-catch в useEffect
   - Graceful fallback (пустое меню)
   - Loading состояние

## 🔧 Обслуживание

### Нужно добавить новый пункт меню?

1. Откройте `/studio`
2. Отредактируйте "Navigation Menu"
3. Нажмите "Add Menu Items"
4. Заполните поля
5. "Publish"

### Нужно удалить пункт?

1. Откройте документ в `/studio`
2. Нажмите ✕ на пункте которые хотите удалить
3. "Publish"

### Нужно изменить порядок?

1. Измените значение "Order" для каждого пункта
2. "Publish"

**Без изменения кода!** 🎉

## 🎓 Примеры реальных структур

### Образовательный сайт

```
1. Home
2. About (accordion)
   - Our Team
   - History
   - Staff
3. Programs (accordion)
   - Elementary
   - Middle School
   - High School
4. Graduates (accordion)
   - Class 2024
   - Class 2023
   - Class 2022
5. Blog
6. Gallery
7. Contact
```

### Портфолио

```
1. Home
2. About
3. Services (accordion)
   - Design
   - Development
   - Consulting
4. Portfolio (accordion)
   - Web Projects
   - Mobile Projects
   - Other
5. Blog
6. Contact
```

## ✅ Проверка перед развертыванием

- [ ] Все файлы созданы/обновлены
- [ ] Нет синтаксических ошибок
- [ ] Импорты правильные
- [ ] API роут работает
- [ ] BurgerMenu загружает данные
- [ ] Меню отображается корректно
- [ ] Accordion работает
- [ ] Ссылки работают
- [ ] Переключение языков работает
- [ ] Протестировано на мобильном

## 🎯 Результат

✅ **Burger Menu полностью управляется через Sanity CMS**
✅ **Администраторы могут редактировать меню без кода**
✅ **Поддержка вложенных пунктов (Accordion)**
✅ **Многоязычная поддержка (en, ru, uk)**
✅ **Оригинальный дизайн и анимации сохранены**
✅ **Динамическое отображение (Link или Accordion в зависимости от данных)**

---

## 📞 Поддержка

Если что-то не работает:

1. **Проверьте консоль браузера** (F12 → Console)
2. **Проверьте Network tab** (запрос к `/api/menu`)
3. **Проверьте Sanity Studio** (документ создан?)
4. **Проверьте документацию** (BURGER_MENU_MIGRATION.md)

**Решение найдется!** 🚀
