import './globals.css'
import { siteConfig } from '@/config/site'
import { Toaster } from '@/ui/components/toaster'
import Navbar from '@/ui/header/navbar'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	links: [
		{
			rel: '',
		},
	],
}

export default function RootLayout({ children }) {
	return (
		<html data-theme='dark' lang='en'>
			<body
				suppressHydrationWarning={true}
				className={`${inter.className} min-h-screen font-sans antialiased`}
			>
				<NextTopLoader showSpinner={false} color='#6519e6' />
				<Toaster />
				<div className='max-w-3xl mx-auto px-4 md:px-6'>
					<Navbar />
					<main className='pb-4'>{children}</main>
				</div>
			</body>
		</html>
	)
}
