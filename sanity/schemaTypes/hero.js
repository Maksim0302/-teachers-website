export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeText',
      description: 'Use line breaks for multiple lines',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
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
      name: 'link',
      title: 'Button Link',
      type: 'string',
      description: 'Internal path, for example /about',
      initialValue: '/about',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'localeString',
    },
  ],
  preview: {
    select: { title: 'title.en' },
    prepare({ title }) {
      return { title: title || 'Hero' }
    },
  },
}
