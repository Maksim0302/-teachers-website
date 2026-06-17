export default {
  name: 'advancedTraining',
  title: 'Advanced Training',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'button',
      title: 'Button Text',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Button Link',
      type: 'string',
      description: 'Internal path, for example /about',
      initialValue: '/about',
    },
    {
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'items',
      title: 'Training Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'trainingItem',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'title.ru' },
            prepare({ title, subtitle }) {
              return {
                title: title || subtitle || 'Training item',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Advanced Training' }
    },
  },
}
