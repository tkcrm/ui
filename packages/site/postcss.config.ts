import * as autoprefixer from "autoprefixer";
import * as cssnano from "cssnano";
import postcssImport from "postcss-import";
import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config";

export default {
  plugins: [
    postcssImport,
    tailwind(tailwindConfig),
    autoprefixer,
    ...(process.env.NODE_ENV === "production" ? [cssnano] : []),
  ],
};
