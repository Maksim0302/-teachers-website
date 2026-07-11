export default {
  name: 'usefulLinks',
  title: 'Useful Links',
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
      name: 'files',
      title: 'Useful Files',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'usefulFile',
          fields: [
            {
              name: 'title',
              title: 'File Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'File Description (Optional)',
              type: 'localeText',
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title.en',
              fileName: 'file.originalFilename',
            },
            prepare({ title, fileName }) {
              return {
                title: title || 'Untitled File',
                subtitle: fileName || 'No file',
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
        title: title || 'Useful Links',
      }
    },
  },
}
