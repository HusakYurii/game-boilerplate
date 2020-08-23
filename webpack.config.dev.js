const path = require("path");

const project = {
  path: process.env.PROJECT_FOLDER,
  port: process.env.PROJECT_PORT
};

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry:  "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist/")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/"),
    compress: false,
    hot: false,
    liveReload: false,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  }
};