const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '.env')});

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app.js'),
        vendor: ['jquery', 'underscore', 'react', 'react-dom', 'axios']
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
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ],
    },
    node: {
        fs: 'empty'
    }
};