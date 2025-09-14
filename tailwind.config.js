/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#0A84FF',
        'off-white': '#F2F2F7',
      },
    },
  },
  plugins: [],
};
