# Integration with Burger Menu - Quick Setup

## How Menu Structure Works

The burger menu is fully managed in **Sanity CMS**. No code changes needed!

### Current Menu Structure (Example)

You should have a "Navigation Menu" in Sanity Studio with menu items like:

- Home
- About
- Blog
- etc.

### Adding Graduates to Menu

Follow these steps in Sanity Studio (`/studio`):

---

## 📋 Step-by-Step Setup

### 1. Go to Navigation Menu

- Click **"Navigation Menu"** in left sidebar
- You should see existing menu items

### 2. Add Graduates Parent Item (if not exists)

Click **"Add Menu Items"** and create:

```
Title: "Випускні" (Ukrainian) / "Graduates" (English) / "Выпускные" (Russian)
Slug: (leave empty if only has children, OR use "graduates" for direct link)
Order: 5 (or your desired position)
Children: [empty for now, will add below]
```

### 3. Add Year Sub-Items

Now in the Graduates parent item, add sub-menu items:

**For 2024:**

```
Title (Ukrainian): "2024"
Title (English): "2024"
Title (Russian): "2024"
Slug: graduates/2024
Order: 1
```

**For 2025:**

```
Title: "2025"
Slug: graduates/2025
Order: 2
```

**For 2026:**

```
Title: "2026"
Slug: graduates/2026
Order: 3
```

Add as many years as you have Graduates documents in Sanity.

### 4. Publish

Click **"Publish"** to save changes.

---

## 🧪 Testing

1. After publishing, go to website home page
2. Click hamburger menu
3. Should see "Випускні" with dropdown arrow
4. Click "Випускні" to expand
5. Should see "2024", "2025", "2026"
6. Click any year
7. Should navigate to `/graduates/2024` (or localized `/en/graduates/2024`)

---

## 📝 Menu vs Graduates Documents

**Two separate things:**

1. **Graduates Documents** (what admin creates)
   - "Graduates" in Sanity sidebar
   - Contains year, title, subtitle, photos
   - Creates actual page content at `/graduates/2024`

2. **Navigation Menu** (Burger Menu)
   - "Navigation Menu" in Sanity sidebar
   - Just links to the Graduates pages
   - Controls which years appear in menu and their order

**You need both:**

- Create Graduates document with year "2024"
- Add menu item with slug "graduates/2024"
- Now page is accessible AND in burger menu

---

## 🎯 Example Complete Setup

### In Sanity - "Graduates" Documents:

```
✅ Document 1: Year "2024" with photos
✅ Document 2: Year "2025" with photos
✅ Document 3: Year "2026" with photos
```

### In Sanity - "Navigation Menu":

```
Parent Item: "Випускні" (Order: 5)
├── 2024 (Slug: graduates/2024, Order: 1)
├── 2025 (Slug: graduates/2025, Order: 2)
└── 2026 (Slug: graduates/2026, Order: 3)
```

### Result:

- Pages accessible at: `/graduates/2024`, `/graduates/2025`, `/graduates/2026`
- Menu shows "Випускні" with dropdown
- Clicking year navigates to correct page

---

## ⚙️ Technical Details

### Slug Patterns in Menu

The slug in menu should match the year:

- If Graduates document has `year: "2024"`
- Menu item should have `slug: "graduates/2024"`
- Results in URL: `/graduates/2024`

### Localization

The menu respects the current language:

- `/ru/...` → Shows Russian menu text
- `/en/...` → Shows English menu text
- `/uk/...` → Shows Ukrainian menu text

Each menu item has localeString for title (en, ru, uk).

---

## 🐛 Common Issues

### Menu item not showing

- Check if menu item is published
- Check if parent item exists
- Verify order value (lower numbers first)

### Clicking menu doesn't navigate

- Check slug matches exactly: `graduates/2024`
- No leading/trailing slashes
- Case-sensitive

### Page shows 404

- Graduates document with that year not created/published
- Check year value in Graduates document matches slug

---

## Adding New Years Later

Simply:

1. Create new Graduates document (e.g., year "2027")
2. Add menu item with slug "graduates/2027"
3. Publish both
4. Done! Page and menu updated

No code changes needed. ✅

---

## For Developers

The menu is fetched by:

- Component: `app/components/BurgerMenu/BurgerMenu.js`
- Action: `app/actions/menu.js`
- Query: `MENU_QUERY` in `sanity/lib/queries.js`

Menu data automatically maps to links and accordion items.
