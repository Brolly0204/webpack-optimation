const webpack = require('webpack');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'); 

module.exports = {
    plugins: [
        // new webpack.DllReferencePlugin({
        //     manifest: require(path.join(__dirname, 'dll', 'react.manifest.json'))    
        // }),
        new ParallelUglifyPlugin({
            workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 保留注释
                },
                compress: {
                    warnings: false, // Uglifyjs 删除没有代码时，不输出警告
                    // drop_console: true, // 删除所有console语句
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        })
        // new HtmlIncludeAssetsPlugin({
        //     assets: ['/dll/react.dll.js'],
        //     append: false
        // })
    ]
};