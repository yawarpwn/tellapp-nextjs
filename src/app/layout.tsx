import './globals.css'
import { siteConfig } from '@/config/site'
import { Toaster } from '@/ui/components/toaster'
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

export default async function RootLayout(
	{ children }: { children: React.ReactNode },
) {
	return (
		<html data-theme='dark' lang='en'>
			<body
				suppressHydrationWarning={true}
				className={`${inter.className} min-h-screen relative font-sans antialiased`}
			>
				<NextTopLoader showSpinner={false} color='oklch(var(--p))' />
				<Toaster />
				{children}
			</body>
		</html>
	)
}
