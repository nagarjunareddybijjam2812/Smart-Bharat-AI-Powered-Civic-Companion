import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CitizenAI — Governance, Reimagined',
    template: '%s | CitizenAI',
  },
  description:
    'One platform where citizens can access government services, apply online, track applications, report issues, and get AI-powered assistance.',
  keywords: ['government', 'services', 'AI assistant', 'civic', 'citizen', 'India', 'digital India'],
  authors: [{ name: 'CitizenAI' }],
  creator: 'CitizenAI Platform',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://citizen-ai.gov.in',
    siteName: 'CitizenAI',
    title: 'CitizenAI — Governance, Reimagined',
    description: 'AI-powered government digital assistant for Indian citizens',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'CitizenAI', description: 'AI-powered civic platform' },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#001233',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="aurora-bg" aria-hidden="true" />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
