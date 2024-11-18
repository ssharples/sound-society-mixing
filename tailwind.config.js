/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chrome: {
          900: '#0F1115',
          800: '#1A1D23',
          700: '#272B33',
          600: '#323842',
          500: '#3E4451'
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.indigo.500/30), 0 0 20px theme(colors.indigo.500/15)',
        'sharp': '5px 5px 0px theme(colors.indigo.500/30)'
      }
    },
  },
  plugins: [],
};
