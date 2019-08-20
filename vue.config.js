module.exports = {
  devServer: {
    proxy: {
      '/niu': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/niu': ''
        }
      }
    }
  }
}
