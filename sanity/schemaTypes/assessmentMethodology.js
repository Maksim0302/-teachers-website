export default {
  name: 'assessmentMethodology',
  title: 'Assessment Methodology',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'methodologyCard',
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
            {
              name: 'stripeColor',
              title: 'Stripe Color',
              type: 'string',
              description: 'Hex color, for example #00838f',
              validation: (Rule) =>
                Rule.required().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: 'hex color',
                  invert: false,
                }),
            },
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'stripeColor' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Card',
                subtitle,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Assessment Methodology' }
    },
  },
}
