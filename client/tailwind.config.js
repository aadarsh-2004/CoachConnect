/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        "blur-gradient":
          "radial-gradient(circle, rgba(0,255,255,0.3) 20%, rgba(0,77,64,0.3) 70%)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        volkhov: ["Volkhov", "sans-serif"],
      },
    },
  },
  plugins: [],
};
