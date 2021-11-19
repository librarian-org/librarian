const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  new CopyPlugin({
    patterns: [
      { from: 'src/locales/', to: './locales/' },
      { from: 'src/assets/', to: './assets/' },
    ],
  }),
  new ForkTsCheckerWebpackPlugin(),
];
