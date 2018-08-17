import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

var webpack = require('webpack');
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler,
    {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

app.use(require("webpack-hot-middleware")(compiler));

Vue.use(VueRouter)

let router = new VueRouter({
    mode: 'history',
    routes
})

export default router