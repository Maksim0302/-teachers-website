# Graduates Page - Administrator Guide (Руководство для администратора)

## Overview

The Graduates page is a dynamic, CMS-driven system that allows administrators to create and manage graduation year pages without touching the code. All content is managed through **Sanity CMS**.

## ✅ What's Implemented

### Pages

- Dynamic routes: `/graduates/2024`, `/graduates/2025`, etc.
- Localized routes: `/en/graduates/2024`, `/ru/graduates/2024`, `/uk/graduates/2024`
- Responsive photo gallery
- SEO-optimized with metadata

### Sanity Integration

- Schema: `Graduates` document type
- GROQ queries for fetching data
- Automatic image optimization
- Multi-language support

### Burger Menu Integration

- Menu items with sub-items (accordion/children)
- Click year → navigate to graduates page
- Fully managed through Sanity CMS

---

## 🛠️ How to Set Up Content

### Step 1: Access Sanity Studio

```bash
npm run sanity
# Opens at http://localhost:3333
```

### Step 2: Create Graduates Document

1. In Sanity Studio sidebar, click **"Graduates"**
2. Click **"Create"** button
3. Fill in the following fields:

#### Required Fields:

**Year** (String)

- Enter graduation year: `2024`, `2025`, `2026`, etc.
- This becomes the URL slug (e.g., `/graduates/2024`)
- Must be unique

**Title** (Localized String)

- Main heading for the page
- Appears in 3 languages:
  - **English**: "Class of 2024"
  - **Russian**: "Класс 2024"
  - **Ukrainian**: "Клас 2024"
- Click language tab to switch

**Subtitle** (Localized String)

- Class description or description
- Appears in 3 languages
- Example: "Graduation ceremony 2024"

**Photos** (Array with Images)

- Click "Add Photo"
- Upload image (will be optimized automatically)
- Add alt text in 3 languages for accessibility
- Add as many photos as needed
- Displayed in responsive grid

#### Optional Fields:

**Description** (Localized Text)

- Additional content/story about the class
- Supports line breaks
- Optional but recommended

### Step 3: Publish

1. Click **"Publish"** button (top right)
2. Choose your deployment (if multiple)
3. Page goes live at `/graduates/{year}`

### Step 4: Update Burger Menu

To add graduates to the burger menu:

1. Go to Sanity Studio → **"Navigation Menu"**
2. Look for or create menu item: **"Випускні"** (Ukrainian) / **"Graduates"**
3. In this item, add sub-items (children):

```
Graduates (parent)
├── 2024
│   Slug: graduates/2024
│   Order: 1
├── 2025
│   Slug: graduates/2025
│   Order: 2
├── 2026
│   Slug: graduates/2026
│   Order: 3
```

4. Save and publish

Now when users click "Випускні" → they see years dropdown → click year → goes to `/graduates/2024`

---

## 📝 Complete Example

### Sanity Document:

```json
{
  "_type": "graduate",
  "year": "2024",
  "title": {
    "en": "Class of 2024",
    "ru": "Класс 2024",
    "uk": "Клас 2024"
  },
  "subtitle": {
    "en": "Graduation Ceremony June 2024",
    "ru": "Церемония выпуска июнь 2024",
    "uk": "Церемонія випуску червень 2024"
  },
  "description": {
    "en": "This year's class achieved outstanding results...",
    "ru": "Класс этого года достиг выдающихся результатов...",
    "uk": "Клас цього року досяг видатних результатів..."
  },
  "photos": [
    {
      "image": {
        /* image data */
      },
      "alt": {
        "en": "Group photo",
        "ru": "Групповое фото",
        "uk": "Групове фото"
      }
    }
    // ... more photos
  ]
}
```

### Resulting Pages:

- `/graduates/2024` (English, based on locale detection)
- `/en/graduates/2024` (Explicitly English)
- `/ru/graduates/2024` (Russian)
- `/uk/graduates/2024` (Ukrainian)

---

## 🎨 Styling

Gallery is responsive:

- **Desktop**: 3+ columns
- **Tablet**: 2+ columns
- **Mobile**: 1 column

Photos maintain aspect ratio and show hover effect (desktop).

---

## 🔄 How to Edit Existing Graduates

1. Open Sanity Studio
2. Click **"Graduates"**
3. Click the year document to edit
4. Make changes
5. Click **"Publish"**
6. Site updates automatically (ISR)

---

## 🗑️ How to Delete Graduates

1. Open Sanity Studio
2. Click **"Graduates"**
3. Right-click document → **Delete**
4. Confirm deletion
5. Site updates automatically

---

## 🐛 Troubleshooting

### Page shows 404

- Check year is published in Sanity
- Check year string matches exactly (case-sensitive)
- Try clearing browser cache

### Photos not showing

- Ensure image is uploaded in Sanity
- Check alt text is filled (at least in one language)
- Verify Sanity image asset URL is accessible

### Translations not appearing

- Check all 3 language tabs are filled (en, ru, uk)
- Ensure text is not empty
- Re-publish after making changes

### Burger menu not showing years

- Verify "Navigation Menu" document has graduates section
- Check sub-item slugs are: `graduates/2024` format
- Verify children are published
- Check menu items have proper "order" values

---

## 📱 Multi-Language Support

Each page automatically detects user's language:

- `/ru/graduates/2024` → Shows Russian content
- `/en/graduates/2024` → Shows English content
- `/uk/graduates/2024` → Shows Ukrainian content
- `/graduates/2024` → Shows based on browser/user preference

Content is translated in Sanity using locale fields (en, ru, uk).

---

## ⚡ Performance

- Static generation: Pages pre-rendered at build time
- ISR (Incremental Static Regeneration): Updates within seconds
- Image optimization: Automatic size/quality adjustment
- SEO optimized: Meta tags and structured data

---

## 📞 Support

For code changes or technical issues, contact development team.

For content questions:

1. Check this guide again
2. Ensure all required fields are filled in Sanity
3. Verify publish status

---

## Architecture

```
User → /graduates/2024
  ↓
Next.js App Router (generateStaticParams + getGraduatePage)
  ↓
Sanity CMS (GRADUATES_BY_YEAR_QUERY)
  ↓
mapGraduateData() → React Component
  ↓
GraduatesPageContent → Responsive Gallery + Metadata
```

No code changes needed to add new years - just create in Sanity!
