/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          light:   '#818cf8',
          dark:    '#4f46e5',
          bg:      '#eef2ff',
        },
      },
    },
  },
  plugins: [],
}
