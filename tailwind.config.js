/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter-bold': ['Inter-Bold', 'Inter', 'Inter Placeholder', 'sans-serif'],
        "feature-text": ["Inter", 'sans-serif'],
        "cominsoon": [ "Maven Pro", 'sans-serif']
      },
      fontSize: {
        'framersize': '36px',
      },
      lineHeight: {
        'framerxx': '1.2',
      },
      letterSpacing: {
        'frameryy': '0',
      },
      spacing: {
        'spacfra': '40px',
      },
      colors:{
        txtPrimary: "#555",
        txtLight: "#999",
        txtDark: "#222",
        bgPrimary: "#f1f1f1",
        headingcol: "#F24653",
        headingstarting: "#EC4E02",
        hoverheadingstarting: "#BD521F",
        findpeer: "#333333",
        authcolor: "#1f2836",
        customizetemp: "#7730D9",
        findpeer: "#7E7F7F"
      },
      screens: {
        'custom': '1020px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
