import Vue from 'vue'
import { ServiceManager, CPService } from 'cp_core'
import { readServices, saveServices } from './persistence'

const store = new Vue({
  data: {
    services: []
  },
  methods: {
    addService (service) {
      const _serv = new CPService(service.name, service.command, service.args)
      return ServiceManager.addService(_serv)
    },
    updateService (index, newService) {
      const _serv = new CPService(newService.name, newService.command, newService.args)
      return ServiceManager.updateService(index, _serv)
    },
    removeService (index) {
      ServiceManager.removeService(index)
    },
    async setup () {
      await readServices()
      this.services = ServiceManager.getServices()
    }
  },
  created () {
    ServiceManager
      .on('insert', saveServices)
      .on('update', saveServices)
      .on('remove', saveServices)
      .on('update:all', saveServices)
  }
})

export default store
