import type { Metadata } from 'next'
import { Bebas_Neue, Inter_Tight, Space_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import { FireCursor } from '@/components/effects/FireCursor'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

// Body font — matches buckssauce.com (Inter Tight)
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TWAHWIHA — Tunisian Hot Sauce',
  description: 'Spice it up with Twahwiha. Real Tunisian hot sauce. No shortcuts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${interTight.variable} ${spaceMono.variable}`}>
      <body>
        <FireCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
