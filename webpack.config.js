/*
 * @Author: Alter 
 * @Date: 2020-07-23 22:07:59 
 * @Last Modified by: Alter
 * @Last Modified time: 2020-07-24 01:15:57
 */

// 引入path模块
const path  = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')  
// 判断环境process.env 后面的环境变量在package.json定义的
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 编译目标
  target:'web',
  // __dirname是这个文件所在的相对目录，在这里也就是根目录。
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path : path.join(__dirname,'dist')
  },
  module: {
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 静态资源

      {
        test: /\.css$/,
        // style-loader 处理style标签里面的css，就不局限于.css文件的了
        // TODO？为什么不局限于css文件
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)/,
        // 使用对象来为loader指定options选项 
        use: [
          {
            // url-loader 把小图片转换为base64代码，直接写入js里，减少请求（不用去请求图片文件了
            loader: 'url-loader',
            options:{
              // 把小于1024（？格式是什么)转化为base64
              limit:1024,
              // 设置一个打包后输出后的图片名，[name]是之前的名字[ext]是后缀名
              name:'[name]-xxx.[ext]'
            }
          }
        ]
      },
      {
        // stylus是一个css预处理器，类似scss
        test: /\.styl/,
        use:[
          // loader是叠加的从下往上依次处理，每个loader只处理自己的部分
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },


  plugins: [
    new VueLoaderPlugin()
  ],

}

if (isDev){
  config.devServer = {
    port:'8000',
    // 0.0.0.0可以多个地方访问
    host:'0.0.0.0',
    // 让webpack的错误限到网页上
    overlay:{
      errors:true
    }
  }
}

module.exports = config

