const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('webpack-copy-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const commonConfig = {
    entry: './src/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        // publicPath: '/design/',
        publicPath: '/',
    },
    resolve: {
        extensions: [ '.jsx', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: nodeModulesPath,
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|otf|woff|woff2|svg|mp4)$/,
                loader: `file-loader`,
                options: {
                    name: '[md5:hash:hex:30].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html',
            hash: true,
        }),
        new CopyPlugin({
            dirs: [{
                from: 'static',
                to: 'public',
            }],
        }),
    ],
    devServer: {
        contentBase: false,
        index: 'index.html',
        historyApiFallback: true,
        open: false,
        host: '0.0.0.0',
    },
    devtool: 'source-map',
};

module.exports = () => {
    return [commonConfig];
};
