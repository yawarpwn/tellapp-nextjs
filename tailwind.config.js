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
        background: 'oklch(var(--background) / <alpha-value>)',
        background200: 'oklch(var(--background-200) / <alpha-value>) ',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
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
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
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
