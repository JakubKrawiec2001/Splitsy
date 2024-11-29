/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        customCyan: "#0FE6DC",
        customBlack: "#26272F",
        customGray: "#F8F9FB",
        customDarkGray: "#F4F4F4",
        customTextColor: "#7A7F94",
        customBlackHover: "#595c6d",
      },
      screens: {
        xs: "375px",
        sm: "400px",
        "2lg": "1100px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
