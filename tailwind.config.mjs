import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes
const accent = {
  50: "#edf7ff",
  100: "#d6ecff",
  200: "#b5dfff",
  300: "#83ccff",
  400: "#48afff",
  500: "#1e8aff",
  600: "#0669ff",
  700: "#0054ff",
  800: "#0841c5",
  900: "#0d3c9b",
  950: "#0e255d",
};
const gray = {
  100: "#f5f6f8",
  200: "#eceef2",
  300: "#c0c2c7",
  400: "#888b96",
  500: "#545861",
  700: "#353841",
  800: "#24272f",
  900: "#17181c",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
      extends: {
        gridTemplateColumns: {
          // Simple 16 column grid
          16: "repeat(16, minmax(0, 1fr))",
        },
      },
    },
  },
  plugins: [starlightPlugin()],
};
