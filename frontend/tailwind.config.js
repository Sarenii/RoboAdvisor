/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shade-1': '#2f442f',
        'shade-2': '#658354',
        'shade-3': '#75975e',
        'shade-4': '#87ab69',
        'shade-5': '#95bb72',
        'shade-6': '#a3c585',
        'shade-7': '#b3cf99',
        'shade-8': '#c7ddb5',
        'shade-9': '#ddead1',
        'green-dark': '#2f442f'  // New darker green
      },
    },
  },
  plugins: [],
}
