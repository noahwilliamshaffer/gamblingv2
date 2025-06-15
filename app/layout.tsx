import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stake - #1 Crypto Casino',
  description: 'The world\'s biggest crypto casino and sportsbook. Play thousands of games with crypto and traditional currencies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0f1419] text-white`}>
        {children}
      </body>
    </html>
  )
} 