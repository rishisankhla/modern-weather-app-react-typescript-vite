/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        card: {
          DEFAULT: '#1C1C1E', // Dark card background
          hover: '#2C2C2E', // Slightly lighter for hover states
        },
        accent: {
          blue: '#0A84FF', // iOS-style blue
          yellow: '#FFD60A', // Bright yellow for weather icons
          red: '#FF453A', // Warning/error red
        },
      },
    },
  },
  plugins: [],
};