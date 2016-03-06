var path = require('path');

var localPath = __dirname.replace(/\\/g, '\/');
var remotePath = 'http://sunhengzhe.sinaapp.com/react-iphone';
module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "build/js/bundle.js",
    publicPath: remotePath
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192,name=/build/images/[hash].[ext]',
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