module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: '#F4F4F4',
      black: '#000000',
      blue: '#13B1C0',
      white: '#FFFFFF',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
