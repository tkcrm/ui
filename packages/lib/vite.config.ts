import path from "node:path";
import typescript2 from "rollup-plugin-typescript2";
import visualizer from "rollup-plugin-visualizer";
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
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "mobx",
        "mobx-keystone",
        "mobx-react-lite",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router-dom": "react-router-dom",
          mobx: "mobx",
          "mobx-keystone": "mobx-keystone",
          "mobx-react-lite": "mobx-react-lite",
        },
      },
    },
    sourcemap: "inline",
    minify: "esbuild",
  },
  plugins: [
    { ...typescript2({}), apply: "build", enforce: "pre" },
    visualizer(),
  ],
});
