/** @type {import('tailwindcss').Config} */
export default {
  _content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  get content() {
    return this._content;
  },
  set content(value) {
    this._content = value;
  },
  theme: {
    extend: {
      colors: {
        verdeFailbnb: "#003315",
        verdeItermedio: "#005F2F",
        olivaOscuro: "#336633",
        durazno: "#FFAA66",
        cobre: "#CC7733",
        terracota: "#E9A672",
      },
    },
  },
  plugins: [],
};
