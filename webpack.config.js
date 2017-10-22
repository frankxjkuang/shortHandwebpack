const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry:  __dirname + "/res/js/main.js",  // 项目的唯一入口文件
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "js/bundle.js?[hash:8]",  // 打包后输出文件的文件名
  },
  devtool: 'eval-source-map',
  devServer: {
  	contentBase: path.join(__dirname, "public"),  // 本地服务器所加载的页面所在的目录
  	historyApiFallback: true,  // 不跳转
  	inline: true,  // 实时刷新
  	port: 7014,
    hot: true
  },
  module: {
  	rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false,
            interpolate: true,
          },
        }],
      },
  		{
  			test: /\.(jsx|js)$/,
  			use: {
  				loader: 'babel-loader',
  				options: {
            cacheDirectory: true,
  					presets: ['es2015', 'react'],
            plugins: ['syntax-dynamic-import', 'transform-runtime'],
  				}
  			},
  			exclude: /node_modules/,
  		},
  		{
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              minimize: true,
              import: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              import: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              import: true,
            },
          },{
            loader: "postcss-loader",
          }
        ]
        /*use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                import: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                import: true,
              },
            },{
              loader: "postcss-loader",
            }
          ],
        }),*/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              useRelativePath: false,
              name: '[name]-[hash:8].[ext]',
              outputPath: '../assets/',
            },
          },
        ],
      },
  	]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究！'),
    new HtmlWebpackPlugin({
      template: __dirname + '/res/index.tmpl.html'
    }),
    new webpack.HotModuleReplacementPlugin(),  // 热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("./css/[name].css?[contenthash:8]", {})
  ]
}