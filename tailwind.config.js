/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extends: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        tahiti: {
          default: '#006233',
        },
      },
    },
  },
  plugins: [],
}
