// Example Sanity Data Structure for Menu Navigation
// This is what the menuNavigation document should look like in Sanity

export const exampleMenuData = {
  _id: 'menuNavigation',
  _type: 'menuNavigation',
  menuItems: [
    {
      _key: 'home-item',
      _type: 'menuItem',
      title: {
        en: 'Home',
        ru: 'Главная',
        uk: 'Головна',
      },
      slug: 'home',
      order: 1,
      children: null, // or [] - empty because this is a simple link
    },
    {
      _key: 'about-item',
      _type: 'menuItem',
      title: {
        en: 'About',
        ru: 'О нас',
        uk: 'Про нас',
      },
      slug: 'about-us',
      order: 2,
      children: [
        {
          _key: 'about-sub-1',
          _type: 'menuSubItem',
          title: {
            en: 'About Us',
            ru: 'О нас',
            uk: 'Про нас',
          },
          slug: 'about',
          order: 1,
        },
        {
          _key: 'about-sub-2',
          _type: 'menuSubItem',
          title: {
            en: 'Our Team',
            ru: 'Наша команда',
            uk: 'Наша команда',
          },
          slug: 'team',
          order: 2,
        },
        {
          _key: 'about-sub-3',
          _type: 'menuSubItem',
          title: {
            en: 'History',
            ru: 'История',
            uk: 'Історія',
          },
          slug: 'history',
          order: 3,
        },
      ],
    },
    {
      _key: 'graduates-item',
      _type: 'menuItem',
      title: {
        en: 'Graduates',
        ru: 'Выпускники',
        uk: 'Випускники',
      },
      slug: null, // Empty - this item only groups children
      order: 3,
      children: [
        {
          _key: 'grad-2024',
          _type: 'menuSubItem',
          title: {
            en: '2024',
            ru: '2024',
            uk: '2024',
          },
          slug: 'graduates/2024',
          order: 1,
        },
        {
          _key: 'grad-2025',
          _type: 'menuSubItem',
          title: {
            en: '2025',
            ru: '2025',
            uk: '2025',
          },
          slug: 'graduates/2025',
          order: 2,
        },
      ],
    },
    {
      _key: 'gallery-item',
      _type: 'menuItem',
      title: {
        en: 'Gallery',
        ru: 'Галерея',
        uk: 'Галерея',
      },
      slug: 'gallery',
      order: 4,
      children: null, // Simple link, no children
    },
    {
      _key: 'blog-item',
      _type: 'menuItem',
      title: {
        en: 'Blog',
        ru: 'Блог',
        uk: 'Блог',
      },
      slug: 'blog',
      order: 5,
      children: null, // Simple link, no children
    },
    {
      _key: 'contact-item',
      _type: 'menuItem',
      title: {
        en: 'Contact',
        ru: 'Контакты',
        uk: 'Контакти',
      },
      slug: 'contact',
      order: 6,
      children: null, // Simple link, no children
    },
  ],
}

// This data will be transformed by mapMenuData() function to:
export const transformedMenuData = {
  menuItems: [
    {
      id: 'home',
      label: 'Home', // or Главная / Головна depending on locale
      href: '/home',
      children: [],
    },
    {
      id: 'about-us',
      label: 'About', // or О нас / Про нас
      href: '/about-us',
      children: [
        {
          id: 'about-us-child-0',
          label: 'About Us',
          href: '/about',
        },
        {
          id: 'about-us-child-1',
          label: 'Our Team',
          href: '/team',
        },
        {
          id: 'about-us-child-2',
          label: 'History',
          href: '/history',
        },
      ],
    },
    {
      id: 'undefined-graduates',
      label: 'Graduates',
      href: null, // No main link because slug is empty
      children: [
        {
          id: 'undefined-graduates-child-0',
          label: '2024',
          href: '/graduates/2024',
        },
        {
          id: 'undefined-graduates-child-1',
          label: '2025',
          href: '/graduates/2025',
        },
      ],
    },
    {
      id: 'gallery',
      label: 'Gallery',
      href: '/gallery',
      children: [],
    },
    {
      id: 'blog',
      label: 'Blog',
      href: '/blog',
      children: [],
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      children: [],
    },
  ],
}
