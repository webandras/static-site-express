/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./content/**/*.ejs", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("flowbite-typography")],
};
