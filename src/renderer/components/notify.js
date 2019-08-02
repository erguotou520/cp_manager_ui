import Vue from 'vue'
import CpNotification from './CpNotification'

const NotificationCtor = Vue.extend(CpNotification)
const noti = new NotificationCtor().$mount('#app-notification')

export default function notify (text, type = 'error') {
  noti.addNotify({ text, type })
}
