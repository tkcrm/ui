import * as path from "node:path";

export const resolve = {
  alias: {
    "@lib": path.resolve(__dirname, "packages/lib"),
  },
};
