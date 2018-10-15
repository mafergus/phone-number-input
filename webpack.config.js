const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    'form/index.js': './src/components/ui/form/index.js',
    'footer/index.js': './src/components/ui/footer/index.js',
    'index.js': './src/index.js',
    'colors.js': './src/util/colors.js',
  },
  output: {
    path: path.resolve(__dirname, '.'),
    filename: '[name]',
    library: '',
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals()],
  stats: "verbose",
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'assets': path.resolve('./src/assets'),
      'components': path.resolve('./src/components'),
      'static': path.resolve('./src/static'),
      'util': path.resolve('./src/util'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};
