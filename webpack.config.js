// process.env.NODE_ENV = '"production"'
process.env.NODE_ENV = '"development"'

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
console.log(`process.env.NODE_ENV: + ${process.env.NODE_ENV}`);


function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = [{
    devtool: 'source-map',
    devServer: {
        contentBase: './dist/client',
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    entry: {
        index: [resolve('src/client/index.tsx')],
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'lodash'],
    },
    output: {
        filename: '[name].js',
        path: resolve('dist/client'),
        publicPath: '/',
    },
    target: 'web',
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|eot|ttf|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        outputPath: 'images/',
                        // publicPath: 'images/'
                    },
                }]
            },
            {
                test: /(\.jsx|\.js)$/,
                include: [
                    resolve("src/client")
                ],
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /(\.tsx|\.ts)$/,
                include: [
                    resolve("src/client")
                ],
                exclude: /(node_modules|bower_components)/,
                loader: "ts-loader",
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': resolve("src/client")
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist/client']),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        // 压缩css和js
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false,
                    comparisons: false,
                    // drop_console: true,
                    // drop_debugger: true,
                },
            }
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['vendor', 'index'],
        //     template: resolve('public/index.html'),
        //     title: 'multi thunk',
        //     filename: 'index.html',
        //     inject: true
        // }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                console.log('show:' + JSON.stringify(getPath('[name].css')));
                return getPath('[name].css');
            },
            allChunks: true
        }),
        // new CopyWebpackPlugin([{
        //     from: resolve('src/images'),
        //     to: './images'
        //   },
        //   {
        //     from: resolve('src/assets'),
        //     to: './assets'
        //   }
        // ]),
        new webpack.HotModuleReplacementPlugin(),
    ]
}, {
    devtool: 'source-map',
    entry: {
        server: [resolve('src/server/server.ts')],
    },
    output: {
        filename: '[name].js',
        path: resolve('dist/server'),
        publicPath: '/',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|eot|ttf|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        outputPath: 'images/',
                        // publicPath: 'images/'
                    },
                }]
            },
            {
                test: /(\.jsx|\.js)$/,
                include: [
                    resolve("src/client"),
                    resolve("src/server")
                ],
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /(\.tsx|\.ts)$/,
                include: [
                    resolve("src/client"),
                    resolve("src/server")
                ],
                exclude: /(node_modules|bower_components)/,
                loader: "ts-loader",
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': resolve("src/server")
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist/server']),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   minChunks: Infinity,
        // }),
        // 压缩css和js
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false,
                    comparisons: false,
                    // drop_console: true,
                    // drop_debugger: true,
                },
            }
        }),
        // new HtmlWebpackPlugin({
        //   chunks: ['vendor', 'index'],
        //   template: resolve('public/index.html'),
        //   title: 'multi thunk',
        //   filename: 'index.html',
        //   inject: true
        // }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                console.log('show:' + JSON.stringify(getPath('[name].css')));
                return getPath('[name].css');
            },
            allChunks: true
        }),
        // new CopyWebpackPlugin([{
        //     from: resolve('src/images'),
        //     to: './images'
        //   },
        //   {
        //     from: resolve('src/assets'),
        //     to: './assets'
        //   }
        // ]),
    ]
}];