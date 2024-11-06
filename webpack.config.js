const webpack = require('webpack');

module.exports = {
  //... outras configurações
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};