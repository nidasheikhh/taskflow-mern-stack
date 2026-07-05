/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B2B26',        // deep teal-black (text/headings)
        flow: {
          50: '#EEF5F3',
          100: '#D7E8E3',
          400: '#2F8F7E',
          600: '#1D6E5F',
          700: '#134E4A',
        },
        amber: {
          400: '#F5A524',
          500: '#E8940F',
        },
        coral: '#FF6B6B',
        mist: '#F3F6F5',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
