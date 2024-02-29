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
      colors: {
        customeStock1: "#22D3EE",
        customeStock2: "#67E8F9",
        customeStock3: "#EF4444",
        customeStock4: "#F87171",
        customeStock5: "#FCA5A5",
        customeStock6: "#FECACA",
        customeStock7: "#FEE2E2",
        customeStock8: "#FEF2F2",
        customeStock9: "#FEF9C3",
        customeStock10: "#DCFDE7",
        customeStock11: "#BBF9D0",
        customeStock12: "#86EFAC",
        customeStock13: "#4ADE80",
        customeStock14: "#22C55E",
        customeStock15: "#16A34A",
        customeStock16: "#D8B4FE",
        customeStock17: "#C084FC",
      },
    },
  },
  plugins: [],
};
