# Структура файлов - Burger Menu Sanity CMS Integration

## 📊 Обзор всех изменений

```
teachers-website/
├── 📄 BURGER_MENU_COMPLETE.md ⭐ НОВЫЙ
│   └─ Полный обзор решения
├── 📄 BURGER_MENU_SETUP.md ⭐ НОВЫЙ
│   └─ Инструкции для администраторов
├── 📄 BURGER_MENU_INITIAL_SETUP.md ⭐ НОВЫЙ
│   └─ Пошаговая начальная настройка
├── 📄 BURGER_MENU_MIGRATION.md ⭐ НОВЫЙ
│   └─ Техническое описание для разработчиков
├── 📄 MENU_DATA_EXAMPLE.js ⭐ НОВЫЙ
│   └─ Примеры структуры данных Sanity
│
├── app/
│   ├── api/ ⭐ НОВАЯ ПАПКА
│   │   └── menu/
│   │       └── route.js ⭐ НОВЫЙ
│   │           └─ API endpoint: GET /api/menu?locale=en
│   │
│   └── components/
│       └── BurgerMenu/
│           ├── BurgerMenu.js ✏️ ИЗМЕНЕН
│           │   ├─ Удален статический массив menuItems
│           │   ├─ Добавлена загрузка из API (useEffect)
│           │   ├─ Добавлена поддержка useLocale()
│           │   ├─ Условный рендеринг (Accordion vs Link)
│           │   └─ Loading и empty состояния
│           │
│           └── BurgerMenu.scss ✏️ ИЗМЕНЕН
│               ├─ Все старые стили сохранены
│               ├─ Добавлен .burger__loading
│               ├─ Добавлен .burger__empty
│               └─ Добавлен .burger__accordion-trigger--link
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.js ✏️ ИЗМЕНЕН
│   │   │   ├─ Добавлен импорт menuNavigation
│   │   │   └─ Добавлен в schemaTypes массив
│   │   │
│   │   └── menuNavigation.js ⭐ НОВЫЙ
│   │       ├─ Document type: menuNavigation
│   │       ├─ Поле: menuItems (array)
│   │       │   ├─ title (localeString: en, ru, uk)
│   │       │   ├─ slug (string)
│   │       │   ├─ order (number)
│   │       │   └─ children (array, optional)
│   │       │       ├─ title (localeString)
│   │       │       ├─ slug (string)
│   │       │       └─ order (number)
│   │       └─ Preview для Sanity Studio
│   │
│   └── lib/
│       └── queries.js ✏️ ИЗМЕНЕН
│           ├─ Добавлен MENU_QUERY (GROQ)
│           ├─ Добавлена getMenuData() функция
│           ├─ Добавлена mapMenuData(data, locale) функция
│           └─ Использует существующий getLocalizedValue()
│
├── sanity.config.js ✏️ ИЗМЕНЕН
│   └─ Добавлено в singletons:
│      { title: 'Navigation Menu', schemaType: 'menuNavigation', documentId: 'menuNavigation' }
```

## 📋 Список файлов

### ⭐ Новые файлы (создано 5)

| Файл                                   | Размер     | Тип       | Описание                    |
| -------------------------------------- | ---------- | --------- | --------------------------- |
| `sanity/schemaTypes/menuNavigation.js` | ~300 строк | Schema    | Sanity схема для меню       |
| `app/api/menu/route.js`                | ~30 строк  | API Route | Endpoint для получения меню |
| `BURGER_MENU_COMPLETE.md`              | ~400 строк | Doc       | Полный обзор решения        |
| `BURGER_MENU_SETUP.md`                 | ~400 строк | Doc       | Инструкции для админов      |
| `BURGER_MENU_MIGRATION.md`             | ~500 строк | Doc       | Техническое описание        |
| `BURGER_MENU_INITIAL_SETUP.md`         | ~300 строк | Doc       | Пошаговая настройка         |
| `MENU_DATA_EXAMPLE.js`                 | ~120 строк | Example   | Примеры данных              |

### ✏️ Измененные файлы (обновлено 5)

| Файл                                        | Что изменилось                                 |
| ------------------------------------------- | ---------------------------------------------- |
| `app/components/BurgerMenu/BurgerMenu.js`   | Удален static array, добавлена загрузка из API |
| `app/components/BurgerMenu/BurgerMenu.scss` | Добавлены стили для loading/empty              |
| `sanity/schemaTypes/index.js`               | Добавлен импорт и экспорт menuNavigation       |
| `sanity/lib/queries.js`                     | Добавлены MENU_QUERY, getMenuData, mapMenuData |
| `sanity.config.js`                          | Добавлено Navigation Menu в singletons         |

## 🔄 Зависимости между файлами

```
sanity.config.js
    ↓ регистрирует схему
sanity/schemaTypes/index.js
    ↓ импортирует
sanity/schemaTypes/menuNavigation.js
    (данные в Sanity)
    ↓
sanity/lib/queries.js
    ↓ GROQ запрос + mapMenuData
app/api/menu/route.js
    ↓ API endpoint
app/components/BurgerMenu/BurgerMenu.js
    ↓ отображает
Пользователь видит меню
```

## 📝 Таблица: Что где находится

| Что          | Где                                         | Назначение                 |
| ------------ | ------------------------------------------- | -------------------------- |
| Данные меню  | Sanity CMS `/studio`                        | Администраторы редактируют |
| Схема меню   | `sanity/schemaTypes/menuNavigation.js`      | Структура в Sanity         |
| GROQ запрос  | `sanity/lib/queries.js` (MENU_QUERY)        | Получает данные из Sanity  |
| API endpoint | `app/api/menu/route.js`                     | Frontend запрашивает меню  |
| Компонент    | `app/components/BurgerMenu/BurgerMenu.js`   | Отображает на странице     |
| Стили        | `app/components/BurgerMenu/BurgerMenu.scss` | Оформление                 |

## 🎯 Информационный поток (Data Flow)

```
СЛОЙ 1: SANITY CMS (Backend данных)
┌─────────────────────────────┐
│  Sanity Document            │
│  ├─ menuNavigation          │
│  │  ├─ menuItems[]          │
│  │  │  ├─ title (en,ru,uk)  │
│  │  │  ├─ slug              │
│  │  │  ├─ order             │
│  │  │  └─ children[]        │
└─────────────────────────────┘
         ↓ GROQ запрос

СЛОЙ 2: API LAYER (Backend обработка)
┌─────────────────────────────┐
│  /api/menu (Node.js)        │
│  ├─ getMenuData()           │
│  │  └─ Fetch from Sanity    │
│  └─ mapMenuData(data, locale)
│     └─ Transform & localize │
└─────────────────────────────┘
         ↓ JSON response

СЛОЙ 3: FRONTEND (Browser)
┌─────────────────────────────┐
│  BurgerMenu.js (React)      │
│  ├─ useEffect               │
│  │  └─ fetch(/api/menu)     │
│  ├─ setMenuItems(data)      │
│  └─ render()                │
│     ├─ if children → Accordion
│     └─ else → Link
└─────────────────────────────┘
         ↓ Visual Display

СЛОЙ 4: ПОЛЬЗОВАТЕЛЬ
┌─────────────────────────────┐
│  Видит Burger Menu на сайте │
│  ├─ Нажимает на пункты      │
│  ├─ Раскрывает Accordion    │
│  └─ Кликает на ссылки       │
└─────────────────────────────┘
```

## 📦 Экспорты и импорты

### `sanity/lib/queries.js` (Экспортирует)

```javascript
export const MENU_QUERY = `...`
export async function getMenuData() { ... }
export function mapMenuData(data, locale) { ... }
export function getLocalizedValue(field, locale, fallback) { ... }
```

### `app/api/menu/route.js` (Импортирует и использует)

```javascript
import { getMenuData, mapMenuData } from '@/sanity/lib/queries'

export async function GET(request) {
  const data = await getMenuData()
  const mappedMenuItems = mapMenuData(data, locale)
  return Response.json({ menuItems: mappedMenuItems })
}
```

### `app/components/BurgerMenu/BurgerMenu.js` (Использует API)

```javascript
useEffect(() => {
  fetch(`/api/menu?locale=${locale}`)
    .then((res) => res.json())
    .then((data) => setMenuItems(data.menuItems))
}, [locale])
```

## 🗂️ Полная иерархия папок

```
teachers-website/
├── app/
│   ├── api/
│   │   └── menu/
│   │       └── route.js ⭐ НОВЫЙ
│   ├── components/
│   │   └── BurgerMenu/
│   │       ├── BurgerMenu.js ✏️ ИЗМЕНЕН
│   │       └── BurgerMenu.scss ✏️ ИЗМЕНЕН
│   ├── context/
│   ├── hooks/
│   ├── studio/
│   ├── about/
│   ├── blog/
│   └── ...
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.js ✏️ ИЗМЕНЕН
│   │   ├── menuNavigation.js ⭐ НОВЫЙ
│   │   ├── localeString.js
│   │   ├── localeText.js
│   │   ├── hero.js
│   │   ├── advancedTraining.js
│   │   ├── assessmentMethodology.js
│   │   └── eventsSchool.js
│   ├── lib/
│   │   ├── queries.js ✏️ ИЗМЕНЕН
│   │   ├── client.js
│   │   └── image.js
│   └── env.js
├── messages/
├── public/
├── scripts/
├── BURGER_MENU_COMPLETE.md ⭐ НОВЫЙ
├── BURGER_MENU_SETUP.md ⭐ НОВЫЙ
├── BURGER_MENU_MIGRATION.md ⭐ НОВЫЙ
├── BURGER_MENU_INITIAL_SETUP.md ⭐ НОВЫЙ
├── MENU_DATA_EXAMPLE.js ⭐ НОВЫЙ
├── sanity.config.js ✏️ ИЗМЕНЕН
├── package.json
├── next.config.mjs
├── i18n.js
└── ...
```

## 🚀 Порядок развертывания

1. **Санity Studio обновление**
   - ✅ Новая схема в `schemaTypes`
   - ✅ Обновлен `sanity.config.js`
   - ✅ Обновлены `queries.js`

2. **Frontend обновление**
   - ✅ Новый API роут
   - ✅ Обновлен компонент BurgerMenu
   - ✅ Обновлены стили

3. **Санity Studio первая настройка**
   - Откройте `/studio`
   - Создайте "Navigation Menu" документ
   - Добавьте пункты меню

4. **Тестирование**
   - Проверьте меню загружается
   - Проверьте Accordion работает
   - Проверьте языки переключаются

## 📊 Статистика

| Метрика             | Значение           |
| ------------------- | ------------------ |
| Новых файлов        | 7                  |
| Измененных файлов   | 5                  |
| Новых строк кода    | ~1500              |
| Удалено строк кода  | ~50 (static array) |
| Строк документации  | ~1500              |
| Файлов документации | 6                  |

## ✅ Контрольный список развертывания

- [ ] Все 7 новых файлов созданы
- [ ] Все 5 файлов обновлены
- [ ] Нет синтаксических ошибок
- [ ] Импорты проверены
- [ ] API endpoint работает
- [ ] Компонент загружает данные
- [ ] Sanity Studio обновлена
- [ ] Новое меню видно в Studio
- [ ] Меню отображается на сайте
- [ ] Протестировано на mobile

---

**Всё готово к развертыванию!** 🎉
