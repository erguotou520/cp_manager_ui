<template>
  <div class="cp-notification-item" :class="[`type-${type}`]">{{text}}</div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'error'
    },
    text: String
  }
}
</script>
