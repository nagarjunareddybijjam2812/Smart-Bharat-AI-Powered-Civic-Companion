import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'CitizenAI Officer Portal' }
export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#001233', color: '#d8e2ff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
