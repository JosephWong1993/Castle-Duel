const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
    //  指定 mode
    //  https://webpack.docschina.org/guides/production/#%E6%8C%87%E5%AE%9A-mode
    //  设置 production mode 配置后，webpack v4+ 会默认使用 TerserPlugin 压缩你的代码。
    //  https://webpack.docschina.org/guides/production/#minification-%E5%8E%8B%E7%BC%A9-
    mode: 'production',
    //  source mapping(源码映射) 
    //  https://webpack.docschina.org/guides/production/#source-mapping-%E6%BA%90%E7%A0%81%E6%98%A0%E5%B0%84-
    devtool: 'source-map',
    plugins: [
        //  最小化 CSS 
        //  https://webpack.docschina.org/guides/production/#%E6%9C%80%E5%B0%8F%E5%8C%96-css
        //  https://webpack.docschina.org/plugins/mini-css-extract-plugin/#minimizing-for-production
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        //  模块标识符(module identifier)
        //  https://webpack.docschina.org/guides/caching/#%E6%A8%A1%E5%9D%97%E6%A0%87%E8%AF%86%E7%AC%A6-module-identifier-
        new webpack.HashedModuleIdsPlugin()
    ],
    module: {
        rules: [
            //  TypeScript
            //  https://webpack.docschina.org/guides/typescript/
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            }
        ]
    }
});