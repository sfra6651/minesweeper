module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],

  safelist: [
    {
      pattern: /grid-cols.+/,
    },
  ],
};
