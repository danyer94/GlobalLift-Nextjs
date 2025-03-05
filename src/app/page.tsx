import Hero from '@/components/Hero'
import Services from '@/components/Services'
import GlobalPresence from '@/components/GlobalPresence'
import CaseStudies from '@/components/CaseStudies'
import ClientPortfolio from '@/components/ClientPortfolio'
import ContactSection from '@/components/ContactSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <GlobalPresence />
      <CaseStudies />
      <ClientPortfolio />
      <ContactSection />
      <Footer />
    </main>
  )
} 