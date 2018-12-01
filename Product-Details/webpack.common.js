const path = require("path");

const SRC_DIR = path.join(__dirname, "/client/src");
const DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        include: SRC_DIR,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  resolve: {
    extensions: [".jsx", ".js"]
  }
};
