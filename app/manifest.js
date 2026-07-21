export default function manifest() {
  return {
    name: 'Iryna Bilyk - Teacher',
    short_name: 'Iryna Bilyk',
    description: 'Educational resources and teaching materials.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/img/logo/logo_new.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
