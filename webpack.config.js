var webpack = require('webpack');
module.exports = {
    'stat': 'no-error',
    entry: [
      "./djangophotoeditor/static/js/app.react.js"
    ],
    output: {
        path: __dirname + '/djangophotoeditor/static/js/build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ }, // to transform JSX into JS
        ]
    },
  }
