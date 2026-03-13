/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brutal-yellow': '#FFDE03',
        'brutal-blue': '#4A90E2',
        'brutal-red': '#FF5733',
        'brutal-cream': '#F8F4E1',
        'brutal-bg': '#FDFCF0',
        'brutal-pink': '#FF80BF',
        'brutal-green': '#00F5A0',
        'brutal-purple': '#A259FF'
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutal-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      borderRadius: {
        'brutal': '40px',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontFamily: {
        'sans' : ['Outfit', 'sans-serif'],
        'comic': ['Outfit', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [tailwindScrollbar],
}