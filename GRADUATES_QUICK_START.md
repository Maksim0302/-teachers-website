# Graduates - Quick Start (5 Minutes)

## 🚀 Get Started in 5 Minutes

### Step 1: Create First Graduate (2 min)

1. Open **Sanity Studio**: Go to `/studio` in your browser
2. Click **"Graduates"** in left sidebar
3. Click **"Create"** button
4. Fill in:
   - **Year**: `2024`
   - **Title** (click language tabs):
     - 🇺🇸 English: "Class of 2024"
     - 🇷🇺 Russian: "Класс 2024"
     - 🇺🇦 Ukrainian: "Клас 2024"
   - **Subtitle** (same): "Graduation Ceremony 2024"
   - **Photos**: Click "Add Photo" and upload images
5. Click **"Publish"** ✅

**Result**: Page ready at `/graduates/2024`

---

### Step 2: Add to Burger Menu (3 min)

1. In Sanity, click **"Navigation Menu"**
2. Find or create **"Випускні"** menu item
3. In this item, add **Children** (sub-items):
   - Click **"Add Children"**
   - **Title**: "2024"
   - **Slug**: `graduates/2024`
   - **Order**: `1`
   - Click **"Create"**
4. Click **"Publish"** ✅

**Result**: Menu shows "Випускні" → Click → See "2024" → Click → Goes to `/graduates/2024`

---

### ✅ You're Done!

Visit website:

- Non-localized: `/graduates/2024`
- English: `/en/graduates/2024`
- Russian: `/ru/graduates/2024`
- Ukrainian: `/uk/graduates/2024`

All pages automatically generated! 🎉

---

## 🔄 Adding More Years Later

**Repeat Step 1-2** for each new year:

- Create: Year "2025" with photos
- Menu: Add child "graduates/2025"
- Publish
- Done!

---

## ❓ Common Questions

### Q: What if page shows 404?

**A**: Check if Graduates document is published in Sanity

### Q: Can I change photos later?

**A**: Yes! Edit Graduate document → Change photos → Publish

### Q: Do I need to change code?

**A**: No! Everything is in Sanity CMS

### Q: What languages are supported?

**A**: English (en), Russian (ru), Ukrainian (uk)
Each field has 3 language tabs

### Q: Can I add unlimited photos?

**A**: Yes! Add as many as needed

### Q: How many years can I create?

**A**: Unlimited! Add years whenever you want

---

## 📸 About Photos

- Each photo needs **image file** and **alt text**
- Alt text: Describe what's in photo (for accessibility)
- Photos displayed in responsive grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- Images auto-optimized (fast loading)

---

## 🌍 Translation Tips

Each field with globe icon 🌐 is translatable:

- Click **"en"** tab → Enter English
- Click **"ru"** tab → Enter Russian
- Click **"uk"** tab → Enter Ukrainian
- All 3 languages should be filled

Example:

```
Title (en): "Class of 2024"
Title (ru): "Класс 2024"
Title (uk): "Клас 2024"
```

---

## 📱 View on All Devices

After publishing, visit:

- **Desktop**: `/graduates/2024` - 3-column gallery
- **Tablet**: Same URL - 2-column gallery
- **Mobile**: Same URL - 1-column gallery

Try resizing browser window to see responsive layout!

---

## 🎯 What's Happening Behind the Scenes?

```
You fill form in Sanity
    ↓
Click Publish
    ↓
Website automatically generates pages:
  - /graduates/2024
  - /en/graduates/2024
  - /ru/graduates/2024
  - /uk/graduates/2024
    ↓
User can visit any URL and see beautiful gallery
```

No code, no waiting, no building! 🚀

---

## 📞 Need Help?

- See `GRADUATES_SETUP.md` for detailed guide
- See `GRADUATES_MENU_INTEGRATION.md` for menu questions
- See `FILES_REFERENCE.md` for technical details

---

## ⚡ Pro Tips

1. **Add order to menu items**: Lower numbers appear first
2. **Use descriptive alt text**: Better for SEO and accessibility
3. **Optimize photos**: Use smaller file sizes for faster load
4. **Test translations**: View `/ru/graduates/2024` etc.
5. **Use consistent formatting**: Keep years in format "2024"

---

## ✨ That's It!

You're now an admin of the Graduates system! 🎓

Create, edit, delete - all in Sanity CMS.
No developers needed. 🚀
