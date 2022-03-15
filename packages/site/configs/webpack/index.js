/* eslint-disable @typescript-eslint/no-var-requires */
const getClientEnviroments = require("./enviroments");
const { moduleExtensions } = require("./constants");

module.exports = (dirname) => {
  const paths = require("./paths")(dirname);
  return {
    paths,
    getClientEnviroments,
    moduleExtensions,
  };
};
