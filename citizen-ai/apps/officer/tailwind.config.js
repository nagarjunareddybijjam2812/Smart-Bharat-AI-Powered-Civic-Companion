const preset = require('@citizen-ai/config/tailwind.preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...preset,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('tailwindcss-animate'),
  ],
}
