module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/resources/themes/tailwind-light/*.css",
  ],
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
  daisyui: {
    themes: ["light"],
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-nested"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
};
