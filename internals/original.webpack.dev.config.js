const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 8080;
const host = process.env.IP || '127.0.0.1';

//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: [
    'webpack-dev-server/client?https://' + host + ':' + port,
    //'webpack-dev-server/client?https://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app.js'
  ],
  output: { 
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
   // publicPath: '/static/'
  },
  externals: {
     jquery: 'var jQuery'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
        loaders: ['react-hot-loader','babel-loader?presets[]=react,presets[]=es2015']
      },
      {
        test: /\.scss$/,
        loaders: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'resolve-url-loader',
            'sass-loader?sourceMap'
        ]
      },
      { test: /\.css$/, 
        loader: 'style-loader!css'
      },
      { test: /\.(ttf|eot|woff|woff2)$/, loader: "file-loader" },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.md$/,
        loader: "html-loader!markdown-highlight"
      }
    ]
  },
  devtool: 'source-map',
 // resolve: {
  //  root: path.resolve('./src'),
 // },
  devServer: {
    historyApiFallback: true,
    //contentBase: path.resolve(__dirname, '../src'),
    hot: true,
    port: port,
    host: host
  },
  plugins: [
   // new ExtractTextPlugin('src/public/stylesheets/app.css', {
   //   allChunks: true
   // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: "jquery"
    })
  ]
};