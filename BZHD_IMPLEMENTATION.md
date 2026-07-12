# БЖД (Safety & Health) Page - Implementation Guide

## Overview
A complete, fully functional БЖД (Safety & Health) page has been created with Sanity CMS integration. The page displays documents and a photo gallery with full admin control through Sanity Studio.

## ✅ What Was Implemented

### Backend (Sanity CMS)
- **Schema**: `bzhd` document type with multilingual support (English, Russian, Ukrainian)
- **Fields**:
  - `title` - Section title (multilingual)
  - `subtitle` - Section subtitle (multilingual)
  - `documents` - Array of document objects with:
    - Document title (multilingual)
    - Description (optional, multilingual)
    - File upload (PDF, DOC, DOCX)
  - `photos` - Array of photo objects with:
    - Image upload
    - Alt text (multilingual)
    - Caption (optional, multilingual)

### Frontend (Next.js)
- **Route**: `/{locale}/bzhd` (supports en, ru, uk)
- **Components**:
  - Main page component with server-side data fetching
  - BZHD container component with state management
  - DocumentCard component for displaying documents
  - Lightbox component for photo viewing
  - Full SCSS styling (500+ lines)

### Features
✅ **Documents Section**:
  - Automatic file type detection (PDF/Word)
  - File icons (📄 for PDF, 📘 for Word)
  - File metadata display (name, type, size)
  - Preview button (PDF only) - opens in new window
  - Download button - downloads file to device

✅ **Photo Gallery**:
  - Responsive adaptive grid
  - Hover effects with zoom animation
  - Lazy loading for performance
  - Optional captions with overlay on hover

✅ **Lightbox Modal**:
  - Full-screen image viewer
  - Previous/Next navigation buttons
  - Thumbnail strip at bottom for quick navigation
  - Keyboard shortcuts:
    - `Escape` - Close
    - `←` / `→` - Previous/Next image
  - Photo counter (current / total)
  - Click backdrop to close

✅ **Responsive Design**:
  - Desktop: Multi-column grid
  - Tablet: 2-column layout
  - Mobile: Single column with optimized touch targets

✅ **Translations**:
  - All UI text in English, Russian, Ukrainian
  - Dynamic language switching
  - Localized button labels

## 🎯 How to Use

### 1. Add Content in Sanity Studio

Go to `/studio` in your application and look for the "БЖД (Safety & Health)" section.

#### Adding Documents:
1. Click on the БЖД document
2. Scroll to "Documents" section
3. Click "Add item"
4. Fill in:
   - **Document Title** (in all languages or just one)
   - **Description** (optional)
   - **Document File** (PDF, DOC, or DOCX)
5. Click to add another document

#### Adding Photos:
1. In the same БЖД document
2. Scroll to "Photo Gallery" section
3. Click "Add item"
4. Upload image
5. Add alt text (for accessibility)
6. Add optional caption

### 2. File Organization

```
Documents:
├── Documents uploaded to Sanity are automatically managed
├── No need to organize files manually
└── New files appear on page immediately after publishing

Photos:
├── Upload through Sanity image picker
├── Automatically optimized for web
└── Appears in gallery grid automatically
```

### 3. Content Publishing

- All changes are **published in Sanity**
- The Next.js page fetches data dynamically
- Changes appear on the website after Sanity publishes

## 📋 File Locations

### Sanity Schema
- `sanity/schemaTypes/bzhd.js` - BZHD document type definition

### React Components
- `app/[locale]/bzhd/page.js` - Server component (page route)
- `app/components/BZHD/BZHD.js` - Main client component
- `app/components/BZHD/DocumentCard.js` - Individual document display
- `app/components/BZHD/Lightbox.js` - Photo lightbox component
- `app/components/BZHD/BZHD.scss` - All styling

### Configuration
- `sanity/lib/queries.js` - GROQ queries and data mapping
- `messages/en.json`, `messages/ru.json`, `messages/uk.json` - Translations

### Schema Registration
- `sanity/schemaTypes/index.js` - BZHD schema imported and exported

## 🔧 Technical Details

### Data Flow
1. **Next.js Page** → Fetches data from Sanity using GROQ
2. **GROQ Query** → Gets title, subtitle, documents, photos
3. **Data Mapper** → Converts Sanity data to component format
4. **React Component** → Renders UI based on mapped data
5. **CSS** → Responsive styling with hover effects

### Document Handling
- PDF files: Show preview button (opens in new tab)
- Word documents (DOC/DOCX): Direct download via button
- File type detection based on file extension

### Image Optimization
- Gallery images: 1600px wide, auto-format, quality optimized
- Lightbox images: 3000px wide for detail viewing
- Lazy loading enabled for performance
- Alt text for accessibility

## 🎨 Customization

### Styling
All styles are in `app/components/BZHD/BZHD.scss`:
- Responsive breakpoints at 768px and 480px
- Customizable colors, spacing, and shadows
- SCSS variables can be added for theming

### Layout
- Documents grid: Single column (can be modified for multi-column)
- Photo grid: `repeat(auto-fit, minmax(320px, 1fr))` responsive
- Modify grid template columns in SCSS to change layout

### Buttons
- Preview button: Blue (#3b82f6)
- Download button: Green (#10b981)
- Customizable in BZHD.scss

## ✨ Best Practices

### Adding Documents
1. **Use descriptive titles** - Makes it clear what the document is about
2. **Add descriptions** - Helps users understand document content
3. **Use correct file type** - PDF for digital, DOC for editable
4. **Name files clearly** - Use descriptive names for downloads

### Adding Photos
1. **Use high-quality images** - At least 1600px wide recommended
2. **Add alt text** - Essential for accessibility and SEO
3. **Add captions** - Provides context for images
4. **Organize in order** - Photos display in upload order

## 📱 Preview URLs

Once deployed:
- English: `https://domain.com/en/bzhd`
- Russian: `https://domain.com/ru/bzhd`
- Ukrainian: `https://domain.com/uk/bzhd`

## 🚀 Deployment

The page is built as a dynamic server-rendered route:
- **Build time**: ~14 seconds
- **Route type**: ƒ (Dynamic - server-rendered)
- **No static pre-rendering**: Data fetched on each request from Sanity

## ⚡ Performance Features

- Lazy loading images
- Image optimization (responsive srcset ready)
- SCSS organized and minimal
- Efficient React component rendering
- Keyboard navigation for accessibility
- Touch-friendly mobile interface

## 🐛 Troubleshooting

### Page shows "No content available"
- Check Sanity: Is the БЖД document created?
- Verify: Are documents/photos published in Sanity?
- Check network: Is Sanity API accessible?

### Images not showing
- Verify: Image uploaded to Sanity
- Check: Image file format (JPG, PNG supported)
- Ensure: Alt text added for accessibility

### Files not downloading
- Check: File size not too large
- Verify: File format is PDF, DOC, or DOCX
- Ensure: File asset properly uploaded to Sanity

### Lightbox not working
- Clear browser cache
- Check: JavaScript enabled in browser
- Verify: Using modern browser (Chrome, Firefox, Safari)

## 📞 Support

For issues or questions about the implementation:
1. Check Sanity Studio documentation
2. Review component code in `/app/components/BZHD/`
3. Check browser console for errors
4. Verify Sanity API connection

---

**Created**: 2026-07-12
**Type**: Dynamic Page (Server-rendered)
**Multilingual**: Yes (EN, RU, UK)
**CMS**: Sanity CMS
**Framework**: Next.js App Router
