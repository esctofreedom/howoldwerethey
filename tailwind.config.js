/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        // bish: ["Palette Mosaic", "cursive"],
      },
      colors: {
        denim: {
          100: "#C2C4D8",
          200: "#A6A9C6",
          300: "#9093B6",
          400: "#707399 ",

          500: "#46486e",
          600: "#353758 ",
          700: "#2A284E",
          800: "#1F1E3E ",
          900: "#181735",
        },
      },
    },
  },
  plugins: [],
};
