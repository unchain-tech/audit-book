/** @type {import('tailwindcss').Config} */
const primaryBaseColor = "#CB4646";
const secondaryBaseColor = "#468BCB";
const myblackBaseColor = "#303030";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: primaryBaseColor,
          50: "#FFF6F6",
          100: "#fad1d7",
          200: "#e8a1a4",
          300: "#dc7e82",
          400: "#e76364",
          500: "#ec564f",
          600: "#dd4f4d",
          700: primaryBaseColor,
          800: "#be403f",
          900: "#ad3936",
        },
        secondary: {
          DEFAULT: secondaryBaseColor,
          50: "#e5f2fa",
          100: "#c0def3",
          200: "#9acbeb",
          300: "#78b6e2",
          400: "#61a6dd",
          500: "#4e98d8",
          600: secondaryBaseColor,
          700: "#3d79b9",
          800: "#3569a7",
          900: "#284c87",
        },
        myblack: {
          DEFAULT: myblackBaseColor,
          50: "#fdfdfd",
          100: "#f8f8f8",
          200: "#f3f3f3",
          300: "#eeeeee",
          400: "#cfcfcf",
          500: "#b2b2b2",
          600: "#888888",
          700: "#737373",
          800: "#535353",
          900: myblackBaseColor,
        },
        // error: '#B00020',
      },
      // boxShadow: {
      //   'inner-main-s': `inset 10px 10px 0 0 ${innerShadowColor}`,
      //   'main-s': `5px 5px 0 0 ${innerShadowColor}`,
      // },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
