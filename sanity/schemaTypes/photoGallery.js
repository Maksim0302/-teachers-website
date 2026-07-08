export default {
  name: 'photoGallery',
  title: 'Photo Gallery',
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
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'photo',
          fields: [
            {
              name: 'image',
              title: 'Photo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'localeString',
              description: 'Describe the photo for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Photo Caption (Optional)',
              type: 'localeString',
            },
          ],
          preview: {
            select: {
              media: 'image',
              alt: 'alt.en',
            },
            prepare({ media, alt }) {
              return {
                title: alt || 'Untitled Photo',
                media,
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
        title: title || 'Photo Gallery',
      }
    },
  },
}
