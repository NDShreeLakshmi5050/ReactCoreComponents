const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'main.js',          // CommonJS output file matching package.json "main"
      libraryTarget: 'commonjs2',   // commonjs2 for Node.js require compatibility
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
      ],
    },
    mode: 'production',
  },
  {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.esm.js',     // ES Module output matching package.json "module"
      library: { type: 'module' },
      environment: { module: true },
      clean: false,                 // avoid cleaning because first build cleans 'dist'
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
      ],
    },
    mode: 'production',
  },
];
