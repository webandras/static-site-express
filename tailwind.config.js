/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./content/**/*.ejs", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  safelist: ["max-w-xl", "max-w-lg", "p-2", "dark:text-white", "w-full", "mx-auto", "text-lg", "font-bold", "text-gray-700", "mb-2", "mb-3"],
  plugins: [require("flowbite/plugin"), require("flowbite-typography")],
};
