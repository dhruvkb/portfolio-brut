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
}
