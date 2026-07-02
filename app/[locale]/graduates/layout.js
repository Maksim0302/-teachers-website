// Graduates layout - parent [locale] layout already wraps with SiteDocument
// No need to wrap again here, just return children
export default async function LocalizedGraduatesLayout({ children }) {
  return children
}
