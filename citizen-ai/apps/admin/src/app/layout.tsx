import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'CitizenAI Admin Portal',
  description: 'Admin portal for CitizenAI government platform',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} style={{ background: '#001233', color: '#d8e2ff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
