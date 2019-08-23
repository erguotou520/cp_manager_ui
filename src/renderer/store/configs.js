import Vue from 'vue'
import { ConfigManager, CPConfig } from 'cp_core'
import { readConfigs, saveConfigs } from './persistence'

const store = new Vue({
  data: {
    // serviceId: CPConfig
    configs: {}
  },
  computed: {
    groups () {
      return Object.values(this.configs).reduce((groups, config) => {
        if (!groups.includes(config.group)) {
          groups.push(config.group)
        }
        return groups
      }, [])
    }
  },
  methods: {
    addConfig (serviceId, config) {
      const _conf = new CPConfig(config.name, config.configs, config.group)
      return ConfigManager.addConfig(serviceId, _conf)
    },
    updateConfig (serviceId, index, newConfig) {
      const _conf = new CPConfig(newConfig.name, newConfig.configs, newConfig.group)
      return ConfigManager.updateConfig(serviceId, index, _conf)
    },
    removeConfig (servceId, index) {
      ConfigManager.removeConfig(servceId, index)
    },
    getServiceConfigs (serviceId) {
      return this.configs.get(serviceId)
    },
    async setup () {
      await readConfigs()
      this.configs = ConfigManager.getConfigMap()
    }
  },
  async created () {
    ConfigManager
      .on('insert', saveConfigs)
      .on('update', saveConfigs)
      .on('remove', saveConfigs)
      .on('update:all', saveConfigs)
  }
})

export default store
