import './globals.css'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/config/site'
import Navbar from '@/components/header/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen font-sans antialiased`}>
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <Navbar />
          <main >{children}</main>
        </div>
      </body>
    </html>
  )
}
