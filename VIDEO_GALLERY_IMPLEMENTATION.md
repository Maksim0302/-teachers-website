# Video Gallery Implementation Guide

## Overview

The Video Gallery feature has been fully implemented with Sanity CMS integration. This allows administrators to manage all video content through Sanity without any code changes.

## What Was Created

### 1. Sanity Schema

**File**: `/sanity/schemaTypes/videoGallery.js`

The schema defines a `videoGallery` document type with:

- **title** (localeString): The main heading of the gallery
- **subtitle** (localeString): Optional subtitle
- **videos** (array): A list of video objects, each containing:
  - **title** (localeString): Video title displayed below the player
  - **youtubeUrl** (string): Full YouTube URL with validation

### 2. GROQ Queries

**File**: `/sanity/lib/queries.js`

Added the following exports:

- `VIDEO_GALLERY_QUERY`: Fetches the video gallery document from Sanity
- `getVideoGalleryData()`: Async function that fetches data
- `mapVideoGalleryData()`: Maps Sanity data to component-friendly format
- `extractYoutubeId()`: Extracts YouTube video ID from various URL formats
- Updated `HOME_PAGE_QUERY` to include video gallery data
- Updated `mapHomePageData()` to include video gallery mapping

### 3. Pages & Components

#### Full Video Gallery Page

**File**: `/app/[locale]/video-gallery/page.js`

- Server component that fetches video gallery data
- Supports all locales (en, ru, uk)
- Dynamic route with proper metadata

#### Video Gallery Page Content Component

**File**: `/app/[locale]/video-gallery/components/VideoGalleryPageContent.js`

- Client component that displays the full video gallery
- Renders all videos in a responsive grid
- Shows video title and "Watch on YouTube" link for each video

#### VideoGallery Home Component

**File**: `/app/components/VideoGallery/VideoGallery.js`

- Updated to accept `content` prop from server
- Displays limited video gallery on home page
- Can be extended with pagination or "View All" links

### 4. Styling

**File**: `/app/components/VideoGallery/VideoGallery.scss`

Enhanced with:

- **Subtitle styling**: Responsive heading below title
- **Card content area**: Padding and layout for title and link
- **Card title**: Truncated to 2 lines with ellipsis
- **YouTube link**: Styled button with hover effect
- Maintains responsive grid (3 columns desktop, 2 tablet, 1 mobile)

### 5. Translations

Updated all message files with complete VideoGallery translations:

- `/messages/en.json` - English
- `/messages/ru.json` - Russian
- `/messages/uk.json` - Ukrainian

Keys available:

- `title`: "Video Gallery" (translated)
- `subtitle`: Description text (translated)
- `button`: "More Videos" (translated)
- `watchOnYoutube`: "Watch on YouTube" (translated)
- `noVideos`: "No videos available" (translated)

## How It Works

### Data Flow

```
Sanity CMS
    ↓
VIDEO_GALLERY_QUERY (GROQ)
    ↓
getVideoGalleryData() → API call
    ↓
mapVideoGalleryData() → Transform to component format
    ↓
Component (receives mapped data)
    ↓
User Interface
```

### URL Structure

- **Full page**: `/{locale}/video-gallery`
  - Example: `/en/video-gallery`, `/ru/video-gallery`, `/uk/video-gallery`
- **Home page section**: Videos displayed in `/{locale}` home page

### YouTube URL Support

The implementation supports multiple YouTube URL formats:

- Standard: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Short: `https://youtu.be/dQw4w9WgXcQ`
- With parameters: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s`

All formats are automatically converted to embed format.

## Sanity Setup Instructions

### 1. Deploy Schema to Sanity

The schema is automatically included when the app starts (via `/sanity/schemaTypes/index.js`).

To see it in Sanity Studio:

1. Go to your Sanity project dashboard
2. The `videoGallery` document type should appear in the Studio
3. Create a new "Video Gallery" document

### 2. Create Video Gallery Content in Sanity

1. In Sanity Studio, create a new document of type **Video Gallery**
2. Fill in the fields:
   - **Section Title**: e.g., "Learn from Our Videos"
   - **Section Subtitle** (optional): e.g., "Discover educational content"
   - **Videos** (array): Add as many videos as needed
3. For each video:
   - **Video Title** (in each language): e.g., "Introduction to Mathematics"
   - **YouTube Video URL**: Paste the full YouTube URL
4. Publish the document

### 3. Manage Videos

The admin can:

- **Add videos**: Click "Add item" in the videos array
- **Edit videos**: Click on any video to edit title or URL
- **Delete videos**: Use the delete button on each video
- **Reorder videos**: Drag videos to change order
- **Update translations**: Edit each language version of title and subtitle

## File Structure

```
teachers-website/
├── app/
│   ├── [locale]/
│   │   ├── page.js (updated to pass video content)
│   │   └── video-gallery/
│   │       ├── page.js (new)
│   │       └── components/
│   │           └── VideoGalleryPageContent.js (new)
│   └── components/
│       └── VideoGallery/
│           ├── VideoGallery.js (updated)
│           └── VideoGallery.scss (updated)
├── messages/
│   ├── en.json (updated)
│   ├── ru.json (updated)
│   └── uk.json (updated)
└── sanity/
    ├── lib/
    │   └── queries.js (updated with video queries)
    └── schemaTypes/
        ├── videoGallery.js (new)
        └── index.js (updated)
```

## Features

✅ **Multilingual Support**: All content (title, subtitle, video titles) supports en, ru, uk  
✅ **Responsive Design**: Works on desktop, tablet, and mobile  
✅ **Dynamic Content**: Add unlimited videos without code changes  
✅ **YouTube Integration**: Embedded players with "Watch on YouTube" links  
✅ **Error Handling**: Shows message if no videos available  
✅ **Clean Code**: Component-based, scalable architecture  
✅ **Performance**: Server-side data fetching with proper caching

## Usage Examples

### On Home Page

The VideoGallery component automatically displays on the home page with data from Sanity:

```jsx
<VideoGallery content={content.videoGallery} />
```

### Full Page

Access the full video gallery at:

- `http://localhost:3000/en/video-gallery`
- `http://localhost:3000/ru/video-gallery`
- `http://localhost:3000/uk/video-gallery`

## Development Notes

- The component automatically extracts YouTube IDs from various URL formats
- Videos are displayed in a 3-column grid on desktop, 2 columns on tablet, 1 on mobile
- Each video card shows the embedded player and metadata below
- The "Watch on YouTube" link opens in a new tab
- Videos are fetched server-side for optimal SEO
- Translations are handled by `next-intl` library

## Troubleshooting

### Videos not showing on home page

- Ensure video gallery document is published in Sanity
- Check that `mapHomePageData` includes `videoGallery` mapping
- Verify the home page passes `content.videoGallery` to the component

### Page route not found

- Run `npm run build` to regenerate routes
- Ensure the `[locale]/video-gallery/page.js` file exists
- Check that locale parameter is correctly passed

### YouTube videos not loading

- Verify the YouTube URL is valid and public
- Check that the URL contains a valid video ID
- Ensure Sanity dataset is published and accessible

## Future Enhancements

Potential improvements:

- Video thumbnails from YouTube
- Video descriptions/metadata
- Categories or playlists for videos
- View count and statistics
- Comments/ratings
- Video duration display
- Filtering and search functionality
- Lazy loading for better performance

## Support

For issues or questions about the implementation:

1. Check the Sanity schema in `/sanity/schemaTypes/videoGallery.js`
2. Review the query functions in `/sanity/lib/queries.js`
3. Check component props in `VideoGallery.js` and `VideoGalleryPageContent.js`
4. Verify translations in `/messages/*.json` files
