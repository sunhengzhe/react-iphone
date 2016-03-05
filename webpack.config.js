var path = require('path');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "build/js/bundle.js",
    publicPath: 'http://sunhengzhe.sinaapp.com/react-iphone'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192,name=/build/images/[name].[ext]',
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