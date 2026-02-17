import React from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono, Onest } from 'next/font/google'
import '../../styles/globals.css'

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
  icons: {
    icon: [
      {
        url: '/logo/Global-Lift.ico',
      },
      {
        url: '/logo/Global-Lift.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  },
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
