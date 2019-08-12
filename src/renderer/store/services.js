import Vue from 'vue'
import { ServiceManager, CPService } from 'cp_core'
import { readServices, saveServices } from './persistence'

const store = new Vue({
  data: {
    services: []
  },
  watch: {
    services () {
      console.log(this.services)
    }
  },
  methods: {
    addService (service) {
      const _serv = new CPService(service.name, service.command, service.args)
      ServiceManager.addService(_serv)
    },
    updateService (index, newService) {
      const _serv = new CPService(newService.name, newService.command, newService.args)
      ServiceManager.updateService(index, _serv)
    },
    removeService (index) {
      ServiceManager.removeService(index)
    }
  },
  async created () {
    ServiceManager
      .on('insert', saveServices)
      .on('update', saveServices)
      .on('remove', saveServices)
      .on('update:all', saveServices)
    await readServices()
    this.services = ServiceManager.getServices()
  }
})

export default store
