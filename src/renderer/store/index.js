import serviceStore from './services.js'
import configStore from './configs.js'

(async () => {
  await serviceStore.setup()
  await configStore.setup()
})()

export { serviceStore, configStore }
