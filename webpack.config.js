const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./assets/js/main.js",
  mode: process.env.NODE_ENV || "development",
  output: {
    path: `${__dirname}/content/assets/js`,
    filename: "main.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
