import * as path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

import postcss from "./postcss.config";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "FRONT_",
  css: { postcss },
  plugins: [
    mdx(),
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy", "classProperties"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "react/jsx-runtime": "react/jsx-runtime.js",
      "@": path.resolve(__dirname, "src"),
      "@tkcrm/ui": path.resolve(__dirname, "../lib/src"),
    },
  },
});
