import Vue from 'vue'
import './components'
import notify from './components/notify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$notify = notify

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
