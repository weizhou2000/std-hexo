const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

var ManifestPlugin = require('webpack-manifest-plugin');

var fs = require('fs')
var ver = new Date().getTime()
//fs.writeFileSync('./dist/h5.json',JSON.stringify({ver}))

module.exports = {
  //mode: "development",
  entry: {
    
    tryIview: './src/try-iv/main.js'
    

    ////library: 'template',
    ////libraryTarget: 'umd'
  },
  //devtool: 'inline-source-map',
  //devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['themes/std/source/mapp']),
    new ManifestPlugin({
      fileName: 'ver.json',
      seed: {
        ver
      }
    }),
    /*new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/tpl/index.html'
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name]-' + ver + '.js',
    path: path.resolve(__dirname, 'themes', 'std', 'source', 'mapp')
  },


  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"), // used for tests
      style: path.resolve(__dirname, "src/style"),
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },


  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.gql$/,
        use: [{
          loader: 'webpack-graphql-loader'
        }]
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(jpg|png|gif)$/i,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?minimize'
      }, {
        test: /\.art$/,
        use: [{
          loader: "art-template-loader", //require.resolve('../'),
          options: {
            htmlResourceRoot: __dirname,
            root: path.resolve(__dirname)
          }
        }]
      }, {
        test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 50000, //小于50K的 都打包
            name: "[hash:8].[name].[ext]",
            publicPath: "imgW1/", //替换CSS引用的图片路径 可以替换成爱拍云上的路径
            outputPath: "../imgW2/" //生成之后存放的路径
          }
        }]
      },







    ]
  }
};