const browserslist = require('@instructure/browserslist-config-canvas-lms');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@artevelde-uas/canvas-lms-app/services': '@artevelde-uas/canvas-lms-app/src/services'
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: browserslist,
                            useBuiltIns: 'entry',
                            corejs: 3
                        }],
                        '@babel/preset-react'
                    ]
                }
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: true,
                        localIdentName: '[hash:base52:5]',
                        exportLocalsConvention: 'camelCaseOnly'
                    }
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            'postcss-import',
                            'postcss-nesting',
                            'postcss-preset-env',
                            ['postcss-url', {
                                url: 'inline',
                                encodeType: 'base64'
                            }],
                            ['postcss-clean', {
                                level: {
                                    1: { removeEmpty: false },
                                    2: { removeEmpty: false }
                                }
                            }]
                        ]
                    }
                }
            }]
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'base64-image-loader'
            }]
        }]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};
