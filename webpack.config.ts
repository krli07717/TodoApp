import * as path from "path";
import * as webpack from "webpack";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
              },
            },
          },
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         [
          //           "postcss-preset-env",
          //           {
          //             // Options
          //           },
          //         ],
          //       ],
          //     },
          //   },
          // },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
  ],
};

export default config;
