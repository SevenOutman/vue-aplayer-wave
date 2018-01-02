var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/vue-aplayer.vue',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-aplayer.min.js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?presets[]=env',
            scss: 'style-loader!css-loader!postcss-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['env', {
              'targets': {
                'browsers': ['last 2 versions', 'safari >= 7']
              }
            }]
          ]
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=40000'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      }
    ]
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    })
  ]
}