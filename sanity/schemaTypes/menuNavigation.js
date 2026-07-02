export default {
  name: 'menuNavigation',
  type: 'document',
  title: 'Navigation Menu',
  fields: [
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Slug (URL path)',
              type: 'string',
              description:
                'e.g., "about", "gallery", "contacts". Leave empty if this item only has children.',
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Sort order in menu (lower numbers appear first)',
            },
            {
              name: 'children',
              title: 'Sub-menu Items (Accordion)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'menuSubItem',
                  title: 'Sub-menu Item',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'localeString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'slug',
                      title: 'Slug (URL path)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'e.g., "about-us", "team", "2024"',
                    },
                    {
                      name: 'order',
                      title: 'Order',
                      type: 'number',
                      description:
                        'Sort order in submenu (lower numbers appear first)',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title.en',
                    },
                    prepare(selection) {
                      const { title } = selection
                      return {
                        title: title || 'Unnamed Item',
                      }
                    },
                  },
                },
              ],
              description:
                'If present, this item will display as an accordion with sub-items. Leave empty for a regular link.',
            },
          ],
          preview: {
            select: {
              title: 'title.en',
              hasChildren: 'children.0',
            },
            prepare(selection) {
              const { title, hasChildren } = selection
              return {
                title: title || 'Unnamed Item',
                subtitle: hasChildren ? 'Has sub-menu' : 'Regular link',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
}
