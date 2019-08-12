<template>
  <cp-dialog :visible.sync="visible" width="auto" max-width="600px" :title="title"
    @ok="onOk" @close="onClose">
    <slot>{{detail}}</slot>
  </cp-dialog>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'WConfirm',
  data () {
    return {
      visible: false,
      title: '',
      detail: '',
      callback: null
    }
  },
  methods: {
    show (title, detail) {
      this.visible = true
      this.title = title
      this.detail = detail
      return new Promise((resolve, reject) => {
        this.callback = v => {
          if (v) {
            resolve()
          } else {
            reject(new Error('cancel'))
          }
        }
      })
    },
    onOk () {
      this.callback(true)
    },
    onClose () {
      this.callback(false)
    }
  },
  created () {
    Vue.prototype.$confirm = this.show
  }
}
</script>
