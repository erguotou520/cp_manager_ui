<template>
  <transition-group name="notifications" class="cp-notification" tag="div">
    <cp-notification-item v-for="task in tasks" :key="task.index"
      :text="task.text" :type="task.type"/>
  </transition-group>
</template>
<script>
import CpNotificationItem from './CpNotificationItem'

let index = 0
export default {
  components: { CpNotificationItem },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    addNotify ({ text, type }) {
      const task = { text, type, index }
      index++
      this.tasks.push(task)
      setTimeout(() => {
        const index = this.tasks.indexOf(task)
        if (index > -1) {
          this.tasks.splice(index, 1)
        }
      }, 3000)
    }
  }
}
</script>
<style lang="postcss">
.cp-notification {
  position: fixed;
  top: 24px;
  right: 12px;
  z-index: 10000;
  & .cp-notification-item {
    padding: 12px 16px;
    border-radius: 4px;
    width: 240px;
    color: rgba(255, 255, 255, 0.8);
    transition: all .3s;
    &.notifications-enter,
    &.notifications-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }
    &.type-error {
      background: var(--dangerColor1);
    }
    & + .cp-notification-item {
      margin-top: 12px;
    }
  }
}
</style>
