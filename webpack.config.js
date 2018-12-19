const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
 {
   devtool: 'cheap-module-source-map',
   module: {
     rules: [
       { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
     ]
   },
   resolve: {
     alias: {
       '@material-ui/core': '@material-ui/core/es'
     }
  },
  entry: './src/client',
  output: {
    path: `${__dirname}/public`
  }
},
{
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    alias: {
      '@material-ui/core': '@material-ui/core/es'
    }
  },
  entry: './src/server',
  target: 'node',
  externals: [nodeExternals({
      whitelist: [
        /@material-ui\/core\/*./
      ]
    })]
}];
