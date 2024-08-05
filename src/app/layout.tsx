import './globals.css'
import { Toaster as ToasterSonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="dark" lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} relative min-h-dvh overflow-x-hidden font-sans antialiased`}
      >
        <NextTopLoader showSpinner={false} color="oklch(var(--primary))" />
        <Toaster />
        <ToasterSonner />
        {children}
      </body>
    </html>
  )
}
