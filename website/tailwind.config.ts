import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

// If you want the animate plugin, uncomment the require line and install the package.
// import animate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    // include any other directories with Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette used in your CSS (primary-50 ... primary-900)
        primary: {
          50: '#f5fbff',
          100: '#e6f6ff',
          200: '#ccefff',
          300: '#99e0ff',
          400: '#66caff',
          500: '#3399ff',   // primary-500
          600: '#1f7be6',   // primary-600 (used in your .btn-secondary)
          700: '#165fb4',
          800: '#0e436f',
          900: '#06283a',
        },
        // border token used by `@apply border-border` in your CSS
        border: 'var(--tw-border, #e6e6e6)',
      },
      ringColor: {
        // optional explicit ring color name mapping
        primary: '#3399ff',
      },
    },
  },
  plugins: [
    // If you want tailwindcss-animate, install it and uncomment:
    // require('tailwindcss-animate'),
    // small helper to expose theme() inside CSS if you need it
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.ring-primary-500': {
          '--tw-ring-color': theme('colors.primary.500'),
        },
      })
    }),
  ],
  // optional safelist if you dynamically create class names
  // safelist: ['focus:ring-primary-500', 'ring-primary-500'],
}

export default config