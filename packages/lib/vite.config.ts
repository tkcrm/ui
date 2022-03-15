import path from "node:path";
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  build: {
    target: "node10",
    lib: {
      entry: resolvePath("./src/index.ts"),
      name: "@tkcrm/ui",
      fileName: (format) => `tkcrm-ui.${format}.js`,
    },
    sourcemap: "inline",
    minify: false,
  },
  plugins: [{ ...typescript2({}), apply: "build", enforce: "pre" }],
});
