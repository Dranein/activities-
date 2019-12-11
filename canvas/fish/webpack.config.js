const config = {
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif|svg)$/, use: ['file-loader'] }
    ]
  }
}

module.exports = config;