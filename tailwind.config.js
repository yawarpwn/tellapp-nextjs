/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'oklch(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'oklch(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'oklch(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			animation: {
				'background-shine': 'background-shine 2s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				'background-shine': {
					'from': {
						'backgroundPosition': '0 0',
					},
					'to': {
						'backgroundPosition': '-200% 0',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
		},
	},
	// plugins: [require('daisyui'), require('tailwindcss-animate')],
	// daisyui: {
	// 	themes: [
	// 		{
	// 			myTheme: {
	// 				'primary': 'oklch(62.37% 0.244 308.5)',
	// 				'primary-content': 'oklch(90% 0 0)',
	// 				'secondary': 'oklch(67.61% 0.2 20.57)',
	// 				'accent': 'oklch(66.65% 0.177 249.59)',
	// 				'accent-content': 'oklch(100% 0 0)',
	// 				'neutral': '#222222',
	// 				'base-100': 'oklch(15% 0 0)',
	// 				'base-200': 'oklch(20% 0 0)',
	// 				'base-300': 'oklch(25% 0 0)',
	// 				'base-content': 'oklch(80% 0 0)',
	// 				'info': 'hsl(158 100% 50%)',
	// 				'success': 'hsl(158 100% 50%)',
	// 				'warning': 'hsl(39 100% 50%)',
	// 				'error': 'hsl(347 100% 50%)',
	// 				'--rounded-box': '0.5rem',
	// 				'--rounded-btn': '0.25rem',
	// 			},
	// 		},
	// 	],
	// },
}
