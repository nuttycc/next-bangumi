/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        flash: 'flash 1.5s ease infinite alternate',
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        frame: '0 0 0px 1px rgba(0, 0, 0, 0,5)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
