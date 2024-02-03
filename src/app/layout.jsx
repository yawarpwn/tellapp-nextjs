import './globals.css'
import { siteConfig } from '@/config/site'
import { Toaster } from '@/ui/components/toaster'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
}

export default async function RootLayout({ children }) {
	return (
		<html data-theme='dark' lang='en'>
			<body
				suppressHydrationWarning={true}
				className={`${inter.className} min-h-screen font-sans antialiased`}
			>
				<NextTopLoader showSpinner={false} color='oklch(var(--p))' />
				<Toaster />
				{children}
			</body>
		</html>
	)
}
