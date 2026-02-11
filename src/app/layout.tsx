import React from 'react'
import type { Metadata } from 'next'
import '../../styles/globals.css'

export const metadata: Metadata = {
  title: 'Global Trade Excellence | Premium Import/Export Solutions',
  description: 'Your trusted partner in international trade and logistics. Offering premium import/export solutions with a global network and decades of expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 
