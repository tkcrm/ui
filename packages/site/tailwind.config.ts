import type {
  TailwindConfig,
  TailwindTheme,
} from "tailwindcss/tailwind-config";
import * as defaultTheme from "tailwindcss/defaultTheme.js";
import forms from "@tailwindcss/forms";

const theme = (defaultTheme as any).default as TailwindTheme;

const config: TailwindConfig = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "../lib/src/assets/css/style.css",
    "../lib/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...theme.fontFamily["sans"]],
      },
    },
  },
  plugins: [forms],
  darkMode: "media",
};

export default config;
