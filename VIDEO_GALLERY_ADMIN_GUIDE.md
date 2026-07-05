# Video Gallery - Admin Setup Checklist

## Quick Start for Administrators

### ✅ Step 1: Access Sanity Studio

1. Go to your Sanity Studio (usually at `/studio` path or your Sanity dashboard)
2. Look for "Video Gallery" in the document types list

### ✅ Step 2: Create Video Gallery Content

**Create a new document:**

1. Click "Create" or "New"
2. Select "Video Gallery" document type
3. Fill in the form:

#### Title

- **English**: "Video Gallery"
- **Russian**: "Видеогалерея"
- **Ukrainian**: "Відеогалерея"

#### Subtitle (Optional)

- **English**: "Watch our collection of educational videos to enhance your learning experience"
- **Russian**: "Посмотрите нашу коллекцию образовательных видео, чтобы улучшить ваш опыт обучения"
- **Ukrainian**: "Подивіться нашу колекцію освітніх відеороликів, щоб покращити ваш досвід навчання"

### ✅ Step 3: Add Videos

**For each video you want to add:**

1. Click **"Add item"** in the Videos array
2. Fill in the video details:

#### Video Title

- Provide in all 3 languages (English, Russian, Ukrainian)
- Example: "Introduction to Teaching Methods"

#### YouTube Video URL

- Paste the full YouTube URL
- Accepted formats:
  - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - `https://youtu.be/dQw4w9WgXcQ`
  - `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s`

3. Click outside the field to validate
4. Repeat for more videos

### ✅ Step 4: Publish

1. Click the **"Publish"** button
2. Wait for confirmation
3. The video gallery will immediately appear on your website!

## Where Videos Will Appear

### Home Page

- Videos appear as a gallery section on the homepage
- Only shows if video gallery document is published

### Dedicated Page

- Full video gallery page at: `/{language}/video-gallery`
  - `/en/video-gallery`
  - `/ru/video-gallery`
  - `/uk/video-gallery`

## Managing Videos

### Edit a Video

1. Click on the video in the array
2. Modify the title or URL
3. Changes auto-save

### Delete a Video

1. Hover over the video
2. Click the delete icon (trash bin)
3. Confirm deletion

### Reorder Videos

1. Click and drag videos in the array
2. Drop to new position

### Remove All Videos

1. Delete each video individually
2. Or delete the entire Video Gallery document

## Video Requirements

- ✅ Videos must be publicly available on YouTube
- ✅ Any video length is supported
- ✅ Playlist URLs are not supported (use individual video URLs)
- ✅ Videos will appear in the order you add them

## Troubleshooting

### "Invalid YouTube URL"

- Make sure you copied the full URL from YouTube
- Check for typos
- Try a different format (youtu.be vs youtube.com)

### Videos not appearing on website

- Refresh your browser (hard refresh: Ctrl+F5 or Cmd+Shift+R)
- Check that the Video Gallery document is published
- Wait 1-2 minutes for cache to clear

### Only some languages showing

- Make sure you filled in the title for all languages
- Check the "Publish" button status
- Verify translations are not empty strings

## Tips

💡 **Multilingual content**: Always fill in titles for all languages for best experience

💡 **Video order**: Videos display in the order you arrange them - most important first

💡 **Video selection**: Choose videos that are relevant and educational

💡 **Regular updates**: Keep content fresh by adding new videos periodically

💡 **Testing**: After publishing, visit the page and test that videos play correctly

## Support

If you need help:

1. Check the full implementation guide: `VIDEO_GALLERY_IMPLEMENTATION.md`
2. Ensure your Sanity connection is working
3. Verify all required fields are filled before publishing

---

**Last Updated**: 2026-07-03
