var path = require('path');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "build/js/bundle.js",
    publicPath: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192,name=/images/[hash].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}