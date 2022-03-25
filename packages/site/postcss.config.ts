import postcssImport from "postcss-import";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindConfig from "./tailwind.config";

export default {
  plugins: [
    postcssImport,
    tailwind(tailwindConfig),
    autoprefixer,
    ...(process.env.NODE_ENV === "production" ? [cssnano] : []),
  ],
};
