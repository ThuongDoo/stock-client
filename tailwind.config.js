/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 5px rgba(66, 153, 225, 0.5)",
          // "0 0px 10px rgba(255, 255,255, 0.2)",
        ],
      },
    },
  },
  plugins: [],
};
