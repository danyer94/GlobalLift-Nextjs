import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { FontClassProvider } from '@/contexts/FontClassContext';
import { getHtmlLang, SITE_URL, OG_IMAGE_PATH } from '@/lib/seo';
import '../../styles/globals.css';

const plusJakartaSans = localFont({
  src: [
    {
      path: './fonts/plus-jakarta-sans-latin.woff2',
      style: 'normal',
      weight: '300 800',
    },
  ],
  variable: '--font-onest',
  display: 'swap',
});

const jetBrainsMono = localFont({
  src: [
    {
      path: './fonts/jetbrains-mono-latin.woff2',
      style: 'normal',
      weight: '400 700',
    },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const hostGrotesk = localFont({
  src: [
    {
      path: './fonts/host-grotesk-latin.woff2',
      style: 'normal',
      weight: '300 800',
    },
  ],
  variable: '--font-host-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Global Lift | Importación, Exportación y Logística',
    template: '%s | Global Lift',
  },
  description:
    'Soluciones B2B de importación, exportación, logística y comercialización en República Dominicana.',
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
  openGraph: {
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Global Lift',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlLang = headers().get('x-globallift-lang') ?? getHtmlLang('es');

  return (
    <html lang={htmlLang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} ${hostGrotesk.variable}`}
      >
        <FontClassProvider monoClassName={jetBrainsMono.className}>
          {children}
        </FontClassProvider>
      </body>
    </html>
  );
}
