export default {
  name: 'bzhd',
  title: 'БЖД (Safety & Health)',
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
      title: 'Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'bzhdDocument',
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
    {
      name: 'photos',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'bzhdPhoto',
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
        title: title || 'БЖД',
      }
    },
  },
}
