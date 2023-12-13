/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  prefix: "tw-",
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
    colors: {
      /* Primary Theme  */
      primary: "#333D91",
      secondary: "#333D91",

      /* Gray Theme  */
      "gray100": "#fffcf8",
      "gray200": "#efefef",
      "gray300": "#e8e8e8",
      "gray400": "#e0e0e0",

      /* Black Theme  */
      "dark-100": "#1e1e1e",
      "dark-200": "#111111",
      "dark-300": "#0a0a0a",
      "dark-400": "#000000",
      ...colors,
    },
  },
  plugins: [],
};
