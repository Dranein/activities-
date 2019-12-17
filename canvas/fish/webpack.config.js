const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]',
            outputPath: './img',
            publicPath: './img'
          }
        }, {
          loader: 'image-webpack-loader'
        }]
      },
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new UglifyJsPlugin(),
  ]
}

// const config = {
//   entry: './src/main.js',
//   output: {
//     filename: 'index.js',
//     path: __dirname + '/dist'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(png|jpg|gif|svg)$/,
//         use: [{
//           loader: 'url-loader',
//           options: {
//             limit: 10000,
//             name: '[name].[ext]',
//             outputPath: './img',
//             publicPath: './img'
//           }
//         }]
//       },
//       {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       filename: "index.html",
//       template: "./index.html"
//     })
//   ]
// }

module.exports = config;