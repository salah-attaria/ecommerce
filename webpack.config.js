const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Other webpack configurations...
  plugins: [
    // Other plugins...
    
    new BundleAnalyzerPlugin()
  ]
};
