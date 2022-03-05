const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  entry: './src/js/index.js', // 진입점
  output: {
    //빌드시 번들링
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'), //생성된 경로
    clean: true, // 해당경로에 파일이있을경우 다지우고 다시 설치
  },
  devtool: 'source-map', // 빌드 파일과 원본파일 연결 시켜줌
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    watchFiles: 'index.html',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'keyboard',
      template: './index.html',
      inject: 'body', //자바스크립트 부분을 어디다넣을껀지 빌드후
      favicon: './favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
