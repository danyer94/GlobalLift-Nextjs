import type { Metadata } from 'next'
import App from '@/App'
import { siteContent, type Language } from '@/content/siteContent'

export function generateMetadata({
  searchParams,
}: {
  searchParams: { lang?: string }
}): Metadata {
  const langParam = searchParams?.lang?.toLowerCase()
  const language: Language = langParam === 'en' ? 'en' : 'es'
  
  return {
    title: siteContent[language].seo.title,
    description: siteContent[language].seo.description,
  }
}

export default function Home() {
  return <App />
}
