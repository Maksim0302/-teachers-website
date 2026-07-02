# Миграция Burger Menu на Sanity CMS - Техническое руководство

## 🎯 Что изменилось

### Было (старая реализация)

```javascript
// BurgerMenu.js - статический массив
const menuItems = [
  {
    id: 'about',
    label: 'About',
    submenu: [
      { label: 'About Us', href: '/about' },
      { label: 'Team', href: '/about/team' },
    ],
  },
  // ... еще пункты
]
```

### Стало (новая реализация)

```javascript
// Данные загружаются из Sanity CMS через API
const response = await fetch(`/api/menu?locale=${locale}`)
const { menuItems } = await response.json()
```

## 📁 Созданные/Измененные файлы

### Новые файлы

1. **`sanity/schemaTypes/menuNavigation.js`** - Sanity схема для меню
2. **`app/api/menu/route.js`** - API роут для получения меню
3. **`BURGER_MENU_SETUP.md`** - Документация для администраторов
4. **`MENU_DATA_EXAMPLE.js`** - Пример структуры данных

### Измененные файлы

1. **`app/components/BurgerMenu/BurgerMenu.js`** - Компонент теперь загружает данные из Sanity
2. **`app/components/BurgerMenu/BurgerMenu.scss`** - Добавлены стили для loading/empty состояний
3. **`sanity/schemaTypes/index.js`** - Добавлен импорт menuNavigation
4. **`sanity/lib/queries.js`** - Добавлены GROQ запрос и функция для маппирования
5. **`sanity.config.js`** - Menu добавлен как синглтон в Studio

## 🔄 Архитектура решения

```
┌─────────────────────┐
│   Sanity CMS        │ ← Администратор редактирует меню
│  (menuNavigation)   │
└──────────┬──────────┘
           │ GROQ запрос
           ↓
┌─────────────────────┐
│  /api/menu route    │ ← Backend: получает и преобразует данные
│  (Node.js)          │
└──────────┬──────────┘
           │ HTTP GET /api/menu?locale=en
           ↓
┌─────────────────────┐
│  BurgerMenu.js      │ ← Frontend: отображает меню
│  (React Component)  │
└─────────────────────┘
```

## 📊 Структура данных

### Запрос (Request)

```
GET /api/menu?locale=en
```

### Ответ (Response)

```json
{
  "menuItems": [
    {
      "id": "about-us",
      "label": "About",
      "href": "/about-us",
      "children": [
        {
          "id": "about-us-child-0",
          "label": "Team",
          "href": "/team"
        }
      ]
    }
  ]
}
```

## 🛠️ Как работает компонент

### 1. Инициализация

```javascript
const BurgerMenu = () => {
  const [menuItems, setMenuItems] = useState([])
  const locale = useLocale() // от next-intl
  // ...
}
```

### 2. Загрузка данных

```javascript
useEffect(() => {
  const fetchMenu = async () => {
    const response = await fetch(`/api/menu?locale=${locale}`)
    const data = await response.json()
    setMenuItems(data.menuItems || [])
  }

  fetchMenu()
}, [locale]) // Перезагружается при смене языка
```

### 3. Отображение

```javascript
menuItems.map((item) => (
  item.children?.length > 0
    ? <Accordion>  // Если есть вложенные пункты
    : <Link>       // Если это просто ссылка
))
```

## 🎨 Функции преобразования

### `mapMenuData(data, locale)`

Преобразует данные из Sanity в формат для компонента:

**Входные данные (из Sanity):**

```javascript
{
  menuItems: [
    {
      title: { en: 'About', ru: 'О нас', uk: 'Про нас' },
      slug: 'about',
      order: 2,
      children: [...]
    }
  ]
}
```

**Выходные данные:**

```javascript
[
  {
    id: 'about',
    label: 'About', // на выбранном языке
    href: '/about',
    children: [...]
  }
]
```

## 🌍 Поддержка локализации

### Как работает

1. BurgerMenu получает текущий язык через `useLocale()` от next-intl
2. Передает язык в API: `/api/menu?locale=en`
3. API передает язык в `mapMenuData(data, locale)`
4. `getLocalizedValue()` вытягивает текст на нужном языке

### Поддерживаемые языки

- `en` - English
- `ru` - Русский
- `uk` - Українська

### Пример

```javascript
// Данные в Sanity
title: { en: 'About', ru: 'О нас', uk: 'Про нас' }

// При locale = 'ru'
label: 'О нас'

// При locale = 'en'
label: 'About'
```

## ✅ Список проверки для развертывания

- [ ] Создан новый файл схемы `menuNavigation.js`
- [ ] Импорт добавлен в `schemaTypes/index.js`
- [ ] GROQ запрос добавлен в `queries.js`
- [ ] API роут создан `/api/menu/route.js`
- [ ] BurgerMenu компонент обновлен
- [ ] Sanity Studio конфигурация обновлена (`sanity.config.js`)
- [ ] Все импорты проверены и корректны
- [ ] Нет синтаксических ошибок
- [ ] Компонент протестирован в разных браузерах
- [ ] Меню загружается на разных языках

## 🧪 Тестирование

### Тест 1: Загрузка меню

```bash
# Откройте консоль браузера (F12)
# Перейдите на страницу с BurgerMenu
# Проверьте Network tab - должен быть запрос GET /api/menu?locale=en
```

### Тест 2: Переключение языка

```bash
# Нажмите на переключатель языка (LangSwitcher)
# Проверьте, что меню обновилось на новом языке
# В Network tab должны быть новые запросы /api/menu?locale=ru, etc.
```

### Тест 3: Клик на пункты меню

```bash
# Откройте Burger Menu (нажмите иконку)
# Кликните на обычный пункт → должна произойти навигация
# Кликните на пункт с вложенными пунктами → должен раскрыться Accordion
# Меню должно закрыться после клика на ссылку
```

### Тест 4: Все браузеры

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## 🔧 Отладка

### Проблема: Меню не загружается

```javascript
// 1. Проверьте консоль браузера на ошибки
console.error() // должна вывести ошибку

// 2. Проверьте, что документ menuNavigation существует в Sanity
// Перейдите в /studio → Navigation Menu

// 3. Проверьте Network tab (F12 → Network)
// GET /api/menu должен вернуть 200 OK

// 4. Проверьте Sanity CMS доступна
// fetch('https://your-project.sanity.io/')
```

### Проблема: Неправильный язык

```javascript
// 1. Проверьте, что useLocale() возвращает правильное значение
// console.log('Current locale:', locale)

// 2. Проверьте, что в Sanity заполнены переводы на все языки
// В документе menuNavigation → title.en, title.ru, title.uk

// 3. Проверьте URL при запросе API
// Должно быть: /api/menu?locale=ru (например)
```

### Проблема: Accordion не работает

```javascript
// 1. Проверьте, что в menuItem есть children массив
// console.log('Menu items:', menuItems)

// 2. Убедитесь, что children не пустой массив
// children.length > 0

// 3. Проверьте SCSS классы:
// .burger__accordion-trigger
// .burger__submenu
```

## 📝 Документация

- **Для администраторов**: [BURGER_MENU_SETUP.md](./BURGER_MENU_SETUP.md)
- **Примеры данных**: [MENU_DATA_EXAMPLE.js](./MENU_DATA_EXAMPLE.js)
- **Repository memory**: [burger-menu-sanity-cms.md](/memories/repo/burger-menu-sanity-cms.md)

## 🚀 Следующие шаги

1. **Развертывание на продакшене**
   - Загрузите новые файлы
   - Развверните схему Sanity (`npm run sanity:deploy`)
   - Протестируйте в production

2. **Запуск в Sanity Studio**
   - Перейдите на `/studio`
   - Создайте новый документ "Navigation Menu"
   - Заполните меню элементы

3. **Мониторинг**
   - Проверяйте логи ошибок
   - Убедитесь, что меню загружается быстро
   - Проверяйте performance API запроса

## ❓ FAQ

**Q: Будет ли работать старое меню, если я не создам новое в Sanity?**
A: Нет. Компонент будет пытаться загрузить меню из API. Если документ не существует, меню будет пустым. Покажется сообщение "No menu items".

**Q: Как откатиться на старое меню?**
A: Есть копия старого кода в git истории. Но лучше создать меню в Sanity, чтобы не потерять возможность управления через CMS.

**Q: Нужно ли изменять Header компонент?**
A: Нет. Header компонент остался без изменений. BurgerMenu используется как раньше.

**Q: Какой максимум уровней вложенности?**
A: Максимум 2 уровня (родитель + дети). Дети не могут иметь своих детей.

**Q: Может ли быть меню без пунктов?**
A: Технически да, но это не имеет смысла. Лучше иметь хотя бы "Home" пункт.
