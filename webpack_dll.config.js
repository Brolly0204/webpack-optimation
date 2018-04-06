const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        react: ['react', 'react-dom'] // 将react react-dom 打包到动态链接库
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'dll'),
        // libraryTarget: 'commonjs',
        library: '_dll_[name]_[hash]' // 全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]_[hash]',
            path: path.join(__dirname, 'dll', '[name].manifest.json') // manifest文件的输出路径
        })
    ]
}