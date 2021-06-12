const path = require('path');
const devMode = process.env.NODE_ENV !== "production";
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
// const { ESBuildMinifyPlugin } = require('esbuild-loader');

// const prod = process.env.NODE_ENV === 'production';
const htmlFiles = ["src/index.html"];
const config = {
  devtool: "source-map",
  entry: {
    // app: './src/js/app'
    app: [path.resolve(__dirname, "src/index.js")],
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    path: path.resolve('app/assets')
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'app'),
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    writeToDisk: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|\/?src\/js\/)/gi,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /src\/js\/.*\.m?js$/,
        exclude: /(node_modules|bower_component)/gi,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/js",
            esModule: false,
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  '...',
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                  {
                    tag: 'img',
                    attribute: 'data-srcset',
                    type: 'srcset',
                  },
                ]
              },
              minimize: {
                collapseWhitespace: false,
                conservativeCollapse: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                removeAttributeQuotes: true,
                // removeComments: !env.c5,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,

        type: 'javascript/auto',
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              outputPath: "assets/css",
              esModule: false,
            },
          },
          "extract-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              outputPath: "assets/css",
              esModule: false,
            },
          },
          "extract-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  // optimization: {
    // minimize: prod,
    // minimizer: [
    //   new ESBuildMinifyPlugin({
    //     css: true
    //   })
    // ]
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    // new CopyPlugin({ patterns: [{ from: 'src/index.html', to: '../views/pages/index.html' }] })
  ],
  // mode: prod ? 'production' : 'development'
  mode: devMode ? "development" : "production",
};

module.exports = config;