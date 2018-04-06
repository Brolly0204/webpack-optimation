const path = require('path');
const webpack = require('webpack');

module.exports = {
   devServer: {
       contentBase: path.join(__dirname, 'dist'),
       compress: true, // 开启Gzip压缩
       port: 9000,
       inline: true,
       hot: true
   },
   plugins: [
       new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin()
   ]
};