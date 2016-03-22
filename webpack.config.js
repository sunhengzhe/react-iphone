var path = require('path');
var webpack = require('webpack');

var localPath = __dirname.replace(/\\/g, '\/');
var remotePath = 'http://sunhengzhe.sinaapp.com/react-iphone';
module.exports = {
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "webpack/hot/only-dev-server",
    "./src/app.js",
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "js/bundle.js",
    publicPath: "build/"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192,name=images/[hash].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}