module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
          target: 'http://api.lxtian.cn/take-out/get_store/',
          // 允许跨域
          changeOrigin: true,
          ws: true,
          pathRewrite: {
              '^/api': ''
          }
      }
  }
  }
}
