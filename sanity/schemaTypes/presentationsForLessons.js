export default {
  name: 'presentationsForLessons',
  title: 'Презентації до уроків та виховних заходів',
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
          name: 'presentationsForLessonsDocument',
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
                accept: '.pdf,.doc,.docx,.ppt,.pptx',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'presentationsForLessonsGalleryItem',
          fields: [
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
              description: 'Description for accessibility and SEO',
            },
          ],
        },
      ],
    },
  ],
}
