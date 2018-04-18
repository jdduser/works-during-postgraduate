//var webpack = require('webpack-stream');
var webpack = require('webpack');

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test:/.jsx?$/, exclude:/node_modules/,loader:'babel-loader',query:{presets:['es2015','react']}}
        ]
    },
    plugins: [

         /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),*/
      /*new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),*/
    ]
};
