import { siteUrl } from './lib/seo'

export const metadata = {
  metadataBase: siteUrl,
  verification: { google: 'pgnIJp98x4AINyr8BSJs-18x6LIYAVmplyPwSAZoIOQ' },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }) {
  return children
}
