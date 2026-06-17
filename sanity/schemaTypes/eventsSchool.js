export default {
  name: 'eventsSchool',
  title: 'Events School',
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
      title: 'Link Button Label',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'eventsSchoolCategory',
          fields: [
            {
              name: 'label',
              title: 'Tab Label',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Category ID',
              type: 'slug',
              options: { source: 'label.en', maxLength: 50 },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Sort Order',
              type: 'number',
              initialValue: 0,
            },
            {
              name: 'events',
              title: 'Events',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'eventsSchoolEvent',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'localeString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'date',
                      title: 'Date',
                      type: 'localeString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      initialValue: '/blog',
                    },
                    {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title.en',
                      subtitle: 'date.en',
                      media: 'image',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label.en', subtitle: 'slug.current' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Category',
                subtitle: subtitle ? `ID: ${subtitle}` : '',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Events School' }
    },
  },
}
