const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = {
    entry: {
        main: './src/index.js', // 指定构建入口文件
    },
    output: {
        path: path.join(__dirname, 'dist'), // 指定构建生成文件所在路径
        filename: '[name].js', // 指定构建生成的文件名
        publicPath: "./",
        //通过asset配置资源
        assetModuleFilename: "img/[name].[hash:4][ext]"
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),

    },
    resolve: {
        extensions: [".js", ".css", ".less", ".scss"], //省略文件后缀
        alias: { //配置别名
            "@": path.resolve(__dirname, "./src"),
            "~": path.resolve(__dirname, "./public"),
        },
    },

    stats: {
        errorDetails: false,
    },
    module: {
        rules: [
            {
                test: /\.js?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
                exclude: /(node_modules|bower_components)/,
                include: [path.resolve(__dirname, 'src')],
                use: {
                    // 指定使用的 loader
                    loader: 'babel-loader', // babel-loader 可以使用 babel 来将 ES6 代码转译为浏览器可以执行的的 ES5 代码
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(css|less|sass|scss)$/i, //匹配所有的 sass/scss/css 文件
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader', 'sass-loader'],
            },
            // {
            //   test: /\.(jpe?g|png|gif)$/i,
            //   use:[
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[name].[ext]',
            //         esModule: false
            //       }
            //     }
            //   ],
            //   type: 'javascript/auto'
            // },
            {
                test: /\.(png|svg|gif|jpg)$/,
                //设置资源目录
                type: 'asset',
                generator: {
                    filename: "img/[name].[hash:4][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                }
            },
        ],
    },

    plugins: [
        // new CopyPlugin([{ from: 'src/public', to: 'public' }]),
        new HtmlWebpackPlugin({
            title: 'Kobe Bryant',
            template: 'public/index.html', // 配置文件模板
        }),
        new MiniCssExtractPlugin({
            // 分离打包样式
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
    ],
}
module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
    // 这里可以通过不同的模式修改 config 配置
    return config
}
