<template>
  <div id="app" class="flex-column">
    <div class="app-toolbar flex ai-center jc-center no-shrink">cp_manager</div>
    <div class="content flex-1 hide-y">
      <default-layout/>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import DefaultLayout from './layouts/Default.vue'

export default {
  components: {
    DefaultLayout
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
body {
  font-size: 13px;
  color: #666;
  -webkit-user-select: none;
}
#app {
  width: 100vw;
  height: 100vh;
}
.app-toolbar {
  -webkit-app-region: drag;
  height: 24px;
  padding: 0 70px;
}
.scrolly-bar {
  border-width: 3px;
  &.axis-y {
    width: 13px;
  }
}
.w-140 {
  width: 140px;
}
/* ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
} */
:focus {
  outline: none;
}
</style>
