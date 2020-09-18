const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

//  启用 HMR (模块热替换)
//  https://webpack.docschina.org/guides/hot-module-replacement/

module.exports = merge(common, {
    mode: 'development',
    //  使用 source map
    //  https://webpack.docschina.org/guides/development/
    devtool: 'inline-source-map',
    //  使用 webpack-dev-server 
    //  告诉 devserver，从什么位置查找文件
    devServer: {
        contentBase: './dist',
        //  启用 HMR (模块热替换)
        hot: true
    },
    plugins: [
        //  启用 HMR (模块热替换)
        new webpack.HotModuleReplacementPlugin(),
        //  重新获得类型检查
        //  https://www.npmjs.com/package/fork-ts-checker-webpack-plugin
        new ForkTsCheckerWebpackPlugin(),
    ],
    module: {
        rules: [
            //  TypeScript
            //  https://webpack.docschina.org/guides/typescript/
            //  构建性能->TypeScript loader
            //  https://webpack.docschina.org/guides/build-performance/#typescript-loader
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                    experimentalWatchApi: true,
                },
            },
            //  加载CSS
            //  https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    }
});