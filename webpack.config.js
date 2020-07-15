//   webpack 是node 写出来的  node的写法
let path = require('path');
module.exports = {
  mode:'development',   // 模式  两种   开发和生产
  entry: './src/index.js',   // 入口文件
  output: {
    filename: 'bundle.js',   // 打包后的文件名
    path: path.resolve(__dirname,'build'),// 打包后的路径;  必须是绝对路径; 利用path模块职工的resolve 解析出来一个绝对路径 dist 文件夹
  }
}
