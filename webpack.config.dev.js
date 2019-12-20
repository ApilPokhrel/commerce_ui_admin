const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime", { regenerator: true }]]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  devtool: "inline-source-map",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    open: true,
    hot: true,
    inline: true,
    host: "localhost", // Defaults to `localhost`
    port: 7000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ]
};
