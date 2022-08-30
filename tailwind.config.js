/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans:['Source Sans Pro','ui-sans-serif','system-ui'],
        mono:['Source Code Pro','ui-monospace']
      },
      fontSize: {
        big:"3rem"
      },
      letterSpacing: {
        semi:"0.12rem",
        kinda:"0.15rem",
        kindof:"0.2rem",
        quite:"0.25rem",
        ql:"0.35rem",
        large:"0.5rem",
        super:"1 rem"
      },
      utilities:{
      },
      colors:{
        main:{
          "50":"#201F1F",
          "100":"#181717",
          "200":"#1B1919",
          "300":"#121111"
        }
      },
      brightness:{
        115:'1.15'
      },
      flexGrow:{
        '2':2
      }
    },
  },
  plugins: [
    plugin(function({addUtilities}){
      const utilities = {
        ".shadow-skill":{
          "box-shadow": "0px 10px 30px rgba(0, 0, 0, 1)"
        }
      }

      addUtilities(utilities);
    }),
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
  }
}


