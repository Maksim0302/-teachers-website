export default {
  name: 'graduate',
  title: 'Graduates',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Graduation Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Year of graduation (e.g., "2024", "2025")',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the graduation page',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
      description: 'Subtitle or class description',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      description: 'Additional content or description for the page',
    },
    {
      name: 'photos',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'graduatePhoto',
          title: 'Photo',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
              description: 'Image description for accessibility',
            },
          ],
          preview: {
            select: {
              image: 'image',
            },
            prepare({ image }) {
              return {
                title: 'Photo',
                media: image,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title.en',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Graduates ${title}`,
        subtitle: subtitle || 'No title',
      }
    },
  },
}
