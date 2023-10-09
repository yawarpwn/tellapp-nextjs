import './globals.css'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/config/site';
import Login from './login';

const inter = Inter({ subsets: ['latin'] })

export const metadata =  {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: siteConfig.openGraph,
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Login />
        <main className='max-w-3xl mx-auto px-4 md:px-6'>
          {children}
        </main>
      </body>
    </html>
  )
}
