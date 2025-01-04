import './globals.css'
import { Toaster as ToasterSonner } from '@/components/ui/sonner'
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

// Since this is the root layout, all fetch requests in the app
// that don't set their own cache option will be cached.
export const fetchCache = 'default-cache'
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme="dark" lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} relative min-h-dvh overflow-x-hidden font-sans antialiased`}
      >
        <NextTopLoader showSpinner={false} color="oklch(var(--primary))" />
        <ToasterSonner />
        {children}
      </body>
    </html>
  )
}
