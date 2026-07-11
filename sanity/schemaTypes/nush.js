export default {
  name: 'nush',
  title: 'NUŠ (Nova Ukrainska Shkola)',
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
      name: 'documents',
      title: 'NUŠ Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'nushDocument',
          fields: [
            {
              name: 'title',
              title: 'Document Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Document Description (Optional)',
              type: 'localeText',
            },
            {
              name: 'file',
              title: 'Document File',
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
                title: title || 'Untitled Document',
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
        title: title || 'NUŠ Documents',
      }
    },
  },
}
