const browserslist = require('@instructure/browserslist-config-canvas-lms');


module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
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
                            targets: browserslist
                        }],
                        '@babel/preset-react'
                    ]
                }
            }]
        }, {
            test: /\.css/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: true,
                        localIdentName: '[hash:base52:5]___[local]',
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
    }
};
