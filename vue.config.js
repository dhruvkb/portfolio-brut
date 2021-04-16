const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle_report.html',
            openAnalyzer: false,
          }),
        ],
      }
    }
    return {}
  },

  chainWebpack: (config) => {
    config.module
      .rule('html')
      .test(/\.fs\.html$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'fs/[name].[hash:8].[ext]',
      })
  },
}
