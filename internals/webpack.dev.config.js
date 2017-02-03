const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 8080;
const host = process.env.IP || '127.0.0.1';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?https://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index'
  ],
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
   // publicPath: '/static/'
  },
  externals: {
     jquery: 'var jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot','babel?presets[]=react,presets[]=es2015,presets[]=react-hmre']
      },
      {
        test: /\.scss$/,
        loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'resolve-url',
            'sass?sourceMap'
        ]
      },
      { test: /\.css$/, 
        loader: 'style!css'
      },
      { test: /\.(ttf|eot|woff|woff2)$/, loader: "file-loader" },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.md$/,
        loader: "html!markdown-highlight"
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    root: path.resolve('./src'),
  },
  devServer: {
    port: port,
    host: host
  },
  plugins: [
    new ExtractTextPlugin('src/public/stylesheets/app.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: "jquery"
    })
  ]
};