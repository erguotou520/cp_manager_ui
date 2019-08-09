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
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(path.resolve('src/renderer/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
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
