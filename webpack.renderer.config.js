const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const TerserPlugin = require('terser-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        exclude: [
          /\/migration/,
          /\/entities/
        ],

      }),
    ],
  },
};
