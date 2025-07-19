// tailwind.config.js
export default {
  content: [
    './index.html', // or your HTML entry point
    './src/**/*.{js,ts,jsx,tsx}', // adjust if your files are elsewhere
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7e69ab', // custom purple
        secondary: '#9333EA', // custom darker purple
        accent: '#F59E0B', // custom amber
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
    },
  },
  plugins: [],
};
