<template>
  <div id="app" class="flex-column">
    <div class="app-toolbar flex ai-center jc-center no-shrink">cp_manager</div>
    <div class="content flex-1 hide-y">
      <default-layout/>
    </div>
    <w-confirm />
  </div>
</template>

<script>
import { remote } from 'electron'
import DefaultLayout from './layouts/Default.vue'
import WConfirm from './widgets/WConfirm'

export default {
  components: {
    DefaultLayout,
    WConfirm
  },
  mounted () {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'F12') {
          remote.getCurrentWindow().webContents.openDevTools()
        }
      }
    }, false)
  }
}
</script>

<style lang="postcss">
@import "~vtc/css/index.css";
@import "./assets/index.css";
</style>
