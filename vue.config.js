const path = require('path')
const builderOptions = require('./scripts/electron-builder')

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  // pages: {
  //   app: 'src/renderer/main.js'
  // },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.output.globalObject('this')
    }
    config.entry('app')
      .clear()
      .add(path.resolve(__dirname, './src/renderer/main.js'))
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/renderer'))
      .set('@shared', path.resolve(__dirname, 'src/shared'))
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeXMLProcInst: true },
            { removeComments: true },
            { removeTitle: false },
            { removeDesc: true },
            { removeXMLNS: true },
            { removeScriptElement: true }
          ]
        }
      })
  },
  pluginOptions: {
    electronBuilder: {
      externals: [],
      builderOptions,
      mainProcessFile: 'src/main/index.js',
      mainProcessWatch: [],
      outputDir: 'build'
    }
  }
}
