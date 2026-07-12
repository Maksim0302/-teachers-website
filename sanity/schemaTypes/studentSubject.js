export default {
  name: 'studentSubject',
  title: 'Student Subjects (На допомогу учням)',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly identifier (e.g., "matematyka", "ukrainska-mova")',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
    {
      name: 'title',
      title: 'Subject Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
      description: 'Subject name in all languages',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
      description: 'Optional subtitle or description',
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
          name: 'subjectPhoto',
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
      title: 'title.en',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug || 'no-slug',
      }
    },
  },
}
