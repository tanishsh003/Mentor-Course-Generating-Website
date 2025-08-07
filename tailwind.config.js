/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Add the colors object here
      colors: {
        primary: 'hsl(var(--primary))',
        primary2nd: 'hsl(var(--primary2nd))', // <-- Add your new color
        // You can add all your other colors here as well
        // Example:
        // secondary: 'hsl(var(--secondary))',
        // background: 'hsl(var(--background))',
      }
    },
  },
  plugins: [],
}