const path = require( 'path' );
const PATHS = {
  app: path.resolve( __dirname, 'app' ),
  build: path.resolve( __dirname, 'build' )
};
module.exports = {
  entry: {
    app: PATHS.app + "/index.js"
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js?/,
        loader: 'babel-loader',
        options: { presets: [ 'env', 'react' ] }
      },
      {
        test: /\.png$/,
        use: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        use: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader? limit=10000&mimetype=application/font-woff'
       },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
       },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
        },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
       }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 4040
  }
};
