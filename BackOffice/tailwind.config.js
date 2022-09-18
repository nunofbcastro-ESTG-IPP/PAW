module.exports = {
  content: ["views/**/*.ejs", "./node_modules/flowbite/**/*.js"],
  variants: {
    margin: ["responsive", "hover"],
  },
  theme: {
    extend: {
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  variants: {
    lineClamp: ["responsive", "hover"],
  },
  plugins: [require("tailwindcss"), require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
