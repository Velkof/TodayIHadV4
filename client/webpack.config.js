const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: {
        app: './assets/js/site/app/index.js',
        vendor: ['jquery', 'underscore', 'react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        })
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};