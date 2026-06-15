import '../globals.scss'
import SiteDocument from '../components/SiteDocument/SiteDocument'

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  return <SiteDocument locale={locale || 'en'}>{children}</SiteDocument>
}
