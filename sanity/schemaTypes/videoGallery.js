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
              type: 'url',
              description:
                'Supports YouTube videos, Shorts, and youtu.be links.',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value) return true

                  const youtubeRegex =
                    /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)[A-Za-z0-9_-]+(?:[?&].*)?$/

                  return youtubeRegex.test(value)
                    ? true
                    : 'Please enter a valid YouTube, Shorts, or youtu.be URL.'
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
