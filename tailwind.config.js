module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  darkMode: 'class', //ダークモードを有効化(ON/OFFの切り替え)
  theme: {
		extend: {
			 fontFamily: {
				fancy: ["Dancing Script"],
				notojp: ['Noto Sans JP'],
				nunito: ['Nunito'],
				fancy: ['Dancing Script'],
			},
      colors: {
        headingColor: "#2e2e2e",
        bgmainColor: "#ecece5",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    [require("daisyui")],
  ],
}
