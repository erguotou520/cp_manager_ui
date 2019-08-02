const extraFiles = []

module.exports = {
  appId: 'cn.caas.aii.models',
  artifactName: '${productName}-${version}.${ext}',
  // asar: true,
  compression: 'maximum',
  copyright: 'Copyright © 2019 erguotou525@gmail.com',
  extraFiles: extraFiles,
  productName: 'cp_manager',
  win: {
    icon: 'icons/icon.ico',
    requestedExecutionLevel: 'highestAvailable',
    target: [
      {
        target: 'nsis',
        arch: [ 'ia32' ]
      }
    ]
  },
  nsis: {
    license: 'LICENSE',
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true
    // installerSidebar: 'icons/installerSidebar.bmp'
  }
}
