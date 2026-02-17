/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Scans app router files
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Scans your components folder
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Safety check for root components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional SaaS font
      },
    },
  },
  plugins: [],
};