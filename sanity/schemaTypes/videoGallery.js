export default {
  name: 'videoGallery',
  title: 'Video Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localeString',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'video',
          fields: [
            {
              name: 'title',
              title: 'Video Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'youtubeUrl',
              title: 'YouTube Video URL',
              type: 'string',
              description:
                'Full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value) return true
                  const youtubeRegex =
                    /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/|^https:\/\/youtu\.be\//
                  return youtubeRegex.test(value)
                    ? true
                    : 'Please provide a valid YouTube URL'
                }),
            },
          ],
          preview: {
            select: {
              title: 'title.en',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled Video',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Video Gallery',
      }
    },
  },
}
