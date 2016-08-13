var plugin = require(__dirname, './index.js')

//console.log(typeof plugin)

module.exports = {

  devtool: 'source-map',

  entry: './dev/dev.jsx',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dev'
  },

  babel:  {
    presets: ['es2015', 'react'],
    plugins: [ plugin ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
