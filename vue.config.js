// vue.config.js
module.exports = {
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:666/', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      },
    }
  }
};