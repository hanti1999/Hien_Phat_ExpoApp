/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#302671',
        'primary-pink': '#fb77c5',
        'primary-red': '#de332b',
        'primary-black': '#333333',
      },
    },
  },
  plugins: [],
};
