/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Compounents/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing:{
        "900": "900px",
        "800": "800px",
        "700": "700px",
        "600": "600px",
        "500": "500px",
        "400": "400px",
        "300": "300px",
        "100": "100px"
      },
      colors: {
        orangeLight: "#EC971F",
        oceanBlue: "rgba(0,8,20,1)",
        darkRed: "#d90429",
        oceanBlueLight: "rgba(0,8,20,0.8)",
        darkLight: "rgba(0,0,0,0.1)",
      },
      fontFamily: {
        Anton: ["Anton", "sans-serif"],
        Lobster: ["Lobster", "cursive"]
      },
      backgroundImage: {
        "noticesBg": "url(/src/assets/images/noticesBackground.jpeg)",
        "escalinatasBg" : "url(/src/assets/images/header-background-2.jpg)",
        "homeMenuBg": "url(/src/assets/images/homeMenuBg.jpg)"
      },
      boxShadow:{
        "3xl": "-2px 2px 16px 0px rgba(0,0,0,0.62)"
      }
    },
  },
  plugins: [],
}
