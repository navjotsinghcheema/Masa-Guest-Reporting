var path = require("path");
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ChunksPlugin = require('webpack-split-chunks');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve('public'),
        filename: 'bundle.js'
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',

                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    optimization: {
    },
    plugins: [
        //uncomment when required
        // new BundleAnalyzerPlugin(),
        // new UglifyJSPlugin()
    ]
}