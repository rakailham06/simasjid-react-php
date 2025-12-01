/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mio-green':'#006B3F',
        'mio-gold':'#D4AF37',
      }
    },
  },
  plugins: [],
}