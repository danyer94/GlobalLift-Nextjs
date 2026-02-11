import React from 'react'
import type { Metadata } from 'next'
import '../../styles/globals.css'
import { siteContent } from '../content/siteContent'

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Archivo+SemiExpanded:wght@500;600;700&family=JetBrains+Mono:wght@400;600&family=Onest:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+SemiExpanded:wght@500;600;700&family=JetBrains+Mono:wght@400;600&family=Onest:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
} 
