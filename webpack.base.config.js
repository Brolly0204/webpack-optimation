const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HappyPack = require('happypack');
const os = require('os'); // 系统操作函数
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        app1: './src/main1.js',
        app2: './src/main2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        // runtimeChunk: {
        //     name: "manifest"
        // },
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0   
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
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
        new webpack.DefinePlugin({ // 定义环境变量
            "process.env": JSON.stringify(process.env.NODE_ENV)
        }),
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new HtmlWebpackPlugin({
            template: resolve('index.html'),
            filename: 'index1.html',
            title: 'hello webpack!',
            chunks: ['vendor', 'commons', 'app1']
        }),
        new HtmlWebpackPlugin({
            template: resolve('index2.html'),
            filename: 'index2.html',
            title: 'hello react!',
            chunks: ['vendor', 'commons', 'app2']
        }),
        new CleanWebpackPlugin([resolve('dist')]),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
