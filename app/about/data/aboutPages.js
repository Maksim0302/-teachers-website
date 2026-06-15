export const aboutPages = {
  team: {
    title: 'Our Team',
    description:
      'Meet the educators and professionals behind our mission to support teachers.',
  },
  history: {
    title: 'History',
    description:
      'Learn how our organization started and the milestones we have reached along the way.',
  },
}

export const aboutUsPage = {
  title: 'About Us',
  description:
    'We are dedicated to empowering teachers with resources, guidance, and community support.',
}

export function getAboutPage(slug) {
  return aboutPages[slug] ?? null
}
