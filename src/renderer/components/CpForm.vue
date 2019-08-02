<template>
  <form @submit.prevent.stop="onSubmit">
    <slot />
  </form>
</template>
<script>
import Notify from './notify'
export default {
  name: 'CpForm',
  methods: {
    validate () {
      return Array.from(this.$el.querySelectorAll('input')).every(el => {
        if (el.checkValidity()) {
          return true
        }
        Notify(el.getAttribute('message') || 'Invalid data.')
        return false
      })
    },
    onSubmit () {
      if (this.validate()) {
        this.$emit('submit')
      } else {
        this.$emit('invalid')
      }
    }
  }
}
</script>
