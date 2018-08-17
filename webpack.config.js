var webpack = require('webpack');
var agent = require('agentkeepalive');
var proxy = 'localhost:58541';
const path = require('path');


module.exports = () => {

    const isDevBuild = !(process.env.NODE_ENV && process.env.NODE_ENV === 'production');

    return [{
        stats: { modules: false },
        entry: { 'main': './ClientApp/boot-app.js' },
        output: {
            path: path.resolve(__dirname, './Scripts/dist'),
            filename: 'bundle.js'
        },
        // IMPORTANT NOTE: If you are using Webpack 2, replace "loaders" with "rules"
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    query: {
                        presets: ["es2015", "stage-3"],
                        comments: false
                    }
                },
                { test: /\.vue$/, include: /ClientApp/, use: 'vue-loader' },
                { test: /\.js$/, include: /ClientApp/, use: 'babel-loader' },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader' }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },

        

    devServer: {
        proxy: {
            '*': {
                target: 'http://' + proxy,
                    changeOrigin: true,
                    agent: new agent({
                        maxSockets: 100,
                        keepAlive: true,
                        maxFreeSockets: 10,
                        keepAliveMsecs: 100000,
                        timeout: 6000000,
                        keepAliveTimeout: 90000 // free socket keepalive for 90 seconds
                    }),
                    onProxyRes: (proxyRes) => {
                    var key = 'www-authenticate';
                    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
                },
                options: {
                    target: 'API_HOST',
                    logLevel: 'debug',
                    auth: 'LOGIN:PASS',
                    agent: proxy.target,
                    onProxyRes: proxy.onProxyRes
                },
            },
            port: 8081,
                host: '0.0.0.0',
                hot: true,
        },
    },

        //devServer: {
        //    proxy: {
        //        hot: true,
        //        '*': {
        //            publicPath: "/",
        //            contentBase: "./public",
        //            target: 'http://localhost:58541',
        //            changeOrigin: true
        //        }
        //    }
        //},
        resolve: {
            extensions: ['.js', '.vue'],
            alias: isDevBuild ? {
                'vue$': 'vue/dist/vue',
                'components': path.resolve(__dirname, './ClientApp/components'),
                'views': path.resolve(__dirname, './ClientApp/views'),
                'utils': path.resolve(__dirname, './ClientApp/utils'),
                'api': path.resolve(__dirname, './ClientApp/store/api')
            } : {
                'components': path.resolve(__dirname, './ClientApp/components'),
                'views': path.resolve(__dirname, './ClientApp/views'),
                'utils': path.resolve(__dirname, './ClientApp/utils'),
                'api': path.resolve(__dirname, './ClientApp/store/api')
            }
        },
        node: {
            fs: 'empty',
            child_process: 'empty',
            module: 'empty'
        },
        //plugins: [
        //    new webpack.HotModuleReplacementPlugin({
        //        multiStep: true,
        //    }),
        //],
    }];
};