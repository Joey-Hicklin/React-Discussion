var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });


module.exports =
[
    {
        name: 'test_data_server',
        target: 'node',
        entry: './dev/js/api/test_data_server.js',
        output: {
            path: './src/',
            publicPath: 'src/',
            filename: 'js/test_data_server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                { test: /\.js$/,

                    loaders: [
                        // 'imports?document=this',

                        // 'react-hot',
                        'babel?presets[]=react,presets[]=es2015'
                        //,'jsx-loader'
                    ]
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        },
        plugins: [
        // new webpack.NormalModuleReplacementPlugin("^(react-bootstrap-modal)$", "^(react)$")
        // new webpack.IgnorePlugin(new RegExp("^(react-bootstrap-modal)$"))
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    },
    {
        name: 'server',
        target: 'node',
        entry: './dev/js/api/server.js',
        output: {
            path: './src/',
            publicPath: 'src/',
            filename: 'js/api_server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                { test: /\.js$/,

                    loaders: [
                        // 'imports?document=this',

                        // 'react-hot',
                        'babel?presets[]=react,presets[]=es2015'
                        //,'jsx-loader'
                    ]
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        },
        plugins: [
        // new webpack.NormalModuleReplacementPlugin("^(react-bootstrap-modal)$", "^(react)$")
        // new webpack.IgnorePlugin(new RegExp("^(react-bootstrap-modal)$"))
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    }
];