const path = require('path'),
    webpack = require(`webpack`),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'), // object de structuring, it need to be the exact name 
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminSvgo = require('imagemin-svgo');

module.exports = {
    mode: 'development',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500
    },
    entry: {
        App: './src/scripts/index.js'
    },
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, './docs'),
        // publicPath: './docs' // the path in which the bundle stored on the webpack server
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader', // this loader won't copy the images that we don't use
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images', // the path in which the images stored on the webpack server
                            publicPath: './images' // the path of the image in the new html file (src)
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                imageminGifsicle(),
                                imageminMozjpeg(),
                                imageminPngquant(),
                                imageminSvgo()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: './[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',   // this is the default behavior, if we don't need another name just drop this
            template: './src/index.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename: './pages/gallery.html',
        //     template: './src/pages/gallery.html',
        //     chunks: []  // what we want to inject (this take value form the entry). ex: ['App']
        // }),
        new CleanWebpackPlugin(),
    ]
};