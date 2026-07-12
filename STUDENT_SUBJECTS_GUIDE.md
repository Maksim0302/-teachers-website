# На допомогу учням (Student Subjects) - Implementation Guide

## Overview
A complete, production-ready **На допомогу учням** (Student Subjects Help) page system has been implemented with full Sanity CMS integration. The page works exactly like the existing "Випускні" (Graduates) page but uses subject slugs instead of years.

## ✅ What Was Implemented

### Sanity Schema (`studentSubject`)
- **Slug**: URL-friendly identifier (e.g., "matematyka", "ukrainska-mova")
- **Title**: Subject name (multilingual - EN, RU, UK)
- **Subtitle**: Optional subject description (multilingual)
- **Description**: Additional content (optional, multilingual)
- **Photos**: Unlimited photo gallery with alt text

### Dynamic Routing
```
/[locale]/students-help/[slug]

Examples:
- /en/students-help/matematyka
- /ru/students-help/matematika
- /uk/students-help/matematyka
```

### Features
✅ **Dynamic slug-based routing** - Each subject gets its own page
✅ **Multilingual support** - English, Russian, Ukrainian
✅ **Photo gallery** - Unlimited images per subject
✅ **ISR enabled** - Content updates every 10 seconds
✅ **Auto-generated URLs** - generateStaticParams handles all combinations
✅ **Reuses existing component** - Same as Graduates page (GraduatesPageContent)
✅ **No code changes needed** - Everything through Sanity

### Build Status
```
✅ Build: Success
✅ Route: ● /[locale]/students-help/[slug] (SSG - Static Site Generation)
✅ Locales: en, ru, uk (auto-generated for each subject)
```

## 📋 How to Use

### Creating a New Subject in Sanity

1. **Access Sanity Studio**: Go to `/studio`
2. **Find Content Types**: Look for "Student Subjects (На допомогу учням)"
3. **Create New Document**:
   - Click "Create" button
   - Select "Student Subjects"
4. **Fill in Fields**:
   - **URL Slug**: Auto-generated from English title (e.g., "matematyka")
   - **Title**: Enter in all 3 languages:
     - EN: "Mathematics"
     - RU: "Математика"
     - UK: "Математика"
   - **Subtitle**: (optional) Short description
   - **Description**: (optional) Full description
   - **Photos**: Click "Add item" to add photos
     - Upload image
     - Add Alt text in all languages
5. **Publish**: Click "Publish" button

### Photo Management

1. Click "Photos" section
2. For each photo:
   - Click "Add item"
   - Upload high-quality image (1600+ px wide recommended)
   - Add descriptive Alt text in all languages
3. Photos display in upload order
4. Reorder by dragging if needed

### Slug Format Best Practices

Use lowercase, hyphen-separated slugs:
- ✅ "matematyka"
- ✅ "ukrainska-mova"
- ✅ "ya-doslidzhuyu-svit"
- ✅ "angliyska-mova"
- ❌ "Matematyka" (avoid capital letters)
- ❌ "Matematika Algebra" (use hyphens instead of spaces)

## 📁 File Structure

### Sanity
- `sanity/schemaTypes/studentSubject.js` - Schema definition
- `sanity/lib/queries.js` - GROQ queries (added):
  - `STUDENT_SUBJECTS_ALL_QUERY` - Fetch all subjects
  - `STUDENT_SUBJECT_BY_SLUG_QUERY` - Fetch by slug
  - `getStudentSubjectsData()` - Async function
  - `getStudentSubjectBySlug()` - Async function
  - `mapStudentSubjectData()` - Data mapping

### Next.js Routes
- `app/[locale]/students-help/[slug]/page.js` - Dynamic page
- `app/students-help/data/studentSubjectsPages.js` - Data functions

### Shared Components
- Uses `app/graduates/components/GraduatesPageContent.js`
- Same styling and layout as Graduates page

## 🔄 Integration with Burger Menu

**Important**: The burger menu should automatically populate with subject names.

### Menu Configuration (in Sanity)
The menu structure supports dynamic children. When editing Navigation Menu in Sanity, you can:

1. Create main menu item: "На допомогу учням"
2. Add subject links as children:
   - Slug: "students-help/matematyka"
   - Title: "Математика"

Or the menu can be manually maintained by adding each subject as a submenu item.

## 📊 Data Structure

### Database (Sanity)
```json
{
  "_type": "studentSubject",
  "slug": { "current": "matematyka" },
  "title": {
    "en": "Mathematics",
    "ru": "Математика",
    "uk": "Математика"
  },
  "subtitle": {
    "en": "Help with Mathematics",
    "ru": "Помощь по Математике",
    "uk": "Допомога з Математики"
  },
  "description": {
    "en": "Resources and materials for...",
    "ru": "Ресурсы и материалы для...",
    "uk": "Ресурси та матеріали для..."
  },
  "photos": [
    {
      "image": { "asset": {...} },
      "alt": {
        "en": "Class photo",
        "ru": "Фото класса",
        "uk": "Фото класу"
      }
    }
  ]
}
```

## 🚀 Creating Multiple Subjects

### Batch Creation
1. Go to Sanity Studio
2. Create first subject completely
3. Use "Duplicate" function (if available) to create similar subjects
4. Edit title, slug, and photos for each
5. Publish all

### Subject List Example
Typical subjects to create:
- matematyka (Mathematics)
- ukrainska-mova (Ukrainian)
- rosiyska-mova (Russian)
- angliyska-mova (English)
- ya-doslidzhuyu-svit (I Explore the World)
- pryrodoznavstvo (Nature Studies)
- mystets-tvo (Art)
- fizchultura (Physical Education)

## 🎨 Styling & Layout

- Uses same styling as Graduates page
- Responsive design (mobile, tablet, desktop)
- Photo gallery with lightbox modal
- Keyboard navigation (arrows, ESC)
- Touch-friendly interface

## 📱 Page Preview

Once published, users can access:
- **Desktop**: `/en/students-help/matematyka`
- **Tablet**: Same URL, responsive layout
- **Mobile**: Single column layout

## ⚡ Performance

- **Generation**: Static Site Generation (SSG)
- **Revalidation**: Every 10 seconds (ISR)
- **Build time**: ~13 seconds
- **Pages created**: 3 locales × number of subjects

## 🔍 Troubleshooting

### Page not showing up

**Problem**: Subject doesn't appear on menu or can't access URL  
**Solution**: 
- Check subject is **published** in Sanity
- Verify **slug** is entered correctly (lowercase, no spaces)
- Rebuild site or wait 10 seconds for ISR

### Photos not displaying

**Problem**: Images not visible on page  
**Solution**:
- Check image is uploaded to Sanity
- Verify alt text is added
- Wait for page to regenerate (10s ISR)

### URL is 404

**Problem**: Getting "Not Found" error  
**Solution**:
- Verify slug matches exactly (case-sensitive in URL)
- Check subject exists in Sanity and is published
- Try accessing English version: `/en/students-help/...`

### Language not displaying

**Problem**: Some languages showing empty fields  
**Solution**:
- Fill in title in all 3 languages (EN, RU, UK)
- Click "fallback" option to use other language if needed

## 💡 Best Practices

### Subject Names
- ✅ Use clear, descriptive names
- ✅ Translate accurately to all 3 languages
- ✅ Use subject's official name if possible
- ✅ Keep names consistent with school curriculum

### Photos
- ✅ Use high-quality images (1600+ pixels)
- ✅ Show relevant classroom or activity photos
- ✅ Add descriptive alt text
- ✅ Organize photos in logical order

### Descriptions
- ✅ Write brief, engaging descriptions
- ✅ Mention key topics covered
- ✅ Include learning outcomes if relevant
- ✅ Keep text concise and clear

## 🔗 URLs Reference

### Pattern
```
/[locale]/students-help/[slug]
```

### Examples
| Locale | Subject | URL |
|--------|---------|-----|
| EN | Mathematics | `/en/students-help/matematyka` |
| RU | Математика | `/ru/students-help/matematyka` |
| UK | Математика | `/uk/students-help/matematyka` |
| EN | Ukrainian | `/en/students-help/ukrainska-mova` |
| RU | Украинский | `/ru/students-help/ukrainska-mova` |
| UK | Українська мова | `/uk/students-help/ukrainska-mova` |

## 🛠️ Technical Details

### ISR (Incremental Static Regeneration)
- Revalidates every 10 seconds
- Updates in background without blocking users
- Perfect for admin content changes

### Static Generation
- Pre-renders all language+subject combinations at build time
- Fast page loads
- SEO-friendly

### Dynamic Fallback
- generateStaticParams handles all locales
- notFound() displays 404 if subject not found
- Graceful error handling

## 📞 Support

### Common Tasks

**Add new subject**: Create document → Publish
**Edit subject**: Open document → Edit → Publish
**Remove subject**: Delete document from Sanity (document will 404)
**Reorder subjects**: Use query sorting (currently alphabetical)
**Translate subject**: Fill all language fields

### Escalation
If issues persist, check:
1. Sanity connection status
2. Schema validation in Studio
3. Build logs for errors
4. Browser console for JavaScript errors

---

**Page Implementation Date**: 2026-07-12  
**Type**: Dynamic SSG Route  
**Multilingual**: Yes (EN, RU, UK)  
**CMS**: Sanity CMS  
**Framework**: Next.js App Router  
**Build Status**: ✅ Verified
