/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#D5CCFF",
          800: "#2B1887",
        },
        priority: {
          high: "#E42C5F",
          medium: "#ECB800",
          low: "#2D41A7",
          inactive: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
