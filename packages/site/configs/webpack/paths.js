// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = (dirname) => ({
  src: path.resolve(dirname, "../../src"),
  build: path.resolve(dirname, "../../dist"),
  public: path.resolve(dirname, "../../public"),
  dotenv: path.resolve(dirname, "../../.env"),
});
