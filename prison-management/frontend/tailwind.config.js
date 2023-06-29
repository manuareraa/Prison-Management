/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "prison-blue": "#028abc",
      "prison-gray": "#e9e9e9",
      "white": "#ffffff",
      "black": "#000000"
    }
  },
  plugins: [require("daisyui")],
}