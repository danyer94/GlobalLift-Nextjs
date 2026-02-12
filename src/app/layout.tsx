import React from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Onest } from 'next/font/google'
import '../../styles/globals.css'
import { siteContent } from '../content/siteContent'

const onest = Onest({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-onest',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteContent.es.seo.title,
  description: siteContent.es.seo.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${onest.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
} 
