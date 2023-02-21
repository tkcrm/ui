import pluginReact from "@vitejs/plugin-react";
import path from "node:path";
//import typescript2 from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";

export default defineConfig({
  build: {
    target: "es2019",
    lib: {
      entry: path.resolve(__dirname, "src", "index.ts"),
      name: "@tkcrm/ui",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router-dom": "react-router-dom",
          mobx: "mobx",
          "mobx-keystone": "mobx-keystone",
          lodash: "lodash",
        },
      },
    },
  },
  plugins: [
    pluginReact({
      jsxRuntime: "classic",
    }),
    typescript(),
    //{ ...typescript2({}), apply: "build", enforce: "pre" },
  ],
});
