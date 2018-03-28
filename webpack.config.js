const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const os = require('os'); // 系统操作函数
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数

function resolve(dir) {
   return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: 'babel-loader?cacheDirectory'
                use: 'happypack/loader?id=babel', // 缓存loader执行结果
                exclude: /node_modules/, // 排除不要加载的文件夹
                include: path.resolve(__dirname, 'src') // 指定需要加载的文件夹
            }
        ],
        noParse: function(content) { // content 从入口开始解析的模块路径
            return /no-parser/.test(content); // 返回true则忽略对no-parser.js的解析
        }
    },
    resolve: {
        modules: [ // 优化模块查找路径
            resolve('src'),
            resolve('node_modules') // 指定node_modules所在位置 当你import第三方模块式 直接从这个路径下搜寻
        ],
        alias: {
            funs$: resolve('src/util/funs.js')
        },
        extensions: ['.js', '.vue']
    },
   plugins: [
    //    new ParallelUglifyPlugin({
    //        workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
    //        uglifyJS: {
    //            output: {
    //               beautify: false, // 不需要格式化
    //               comments: false // 保留注释
    //            },
    //            compress: {
    //               warnings: false, // Uglifyjs 删除没有代码时，不输出警告
    //               drop_console: true, // 删除所有console语句
    //               collapse_vars: true,
    //               reduce_vars: true
    //            }
    //        }
    //    }),
       new HappyPack({
           id: 'babel',
           loaders: ['babel-loader?cacheDirectory'],
           threadPool: happyThreadPool,
           verbose: true
       }),
       new webpack.DllReferencePlugin({
        //    manifest: require('./dist/react.manifest.json')
           manifest: resolve('dist/react.manifest.json')
       }),
       new HtmlWebpackPlugin({
           template: resolve('src/index.html'),
           title: 'hello liwenli'
       }),
       new HtmlIncludeAssetsPlugin({ // 引入链接库
           assets: ['./react.dll.js'], // 将资源添加到html中 增强html-webpack-plugin 功能
           append: false // false 在其他资源的之前添加 true 在其他资源之后添加
       })
   ]
}