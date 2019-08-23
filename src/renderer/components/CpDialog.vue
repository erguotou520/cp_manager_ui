<template>
  <transition name="dialog">
    <div v-if="show" class="cp-dialog"
      :style="{'z-index':zIndex,'justify-content':middle ? 'center': 'flex-start'}">
      <div class="dialog-wrapper" :style="{width,maxWidth}" ref="dialog">
        <header ref="header" v-if="showHeader" class="dialog-header" :class="[headerClass]">
          <div class="dialog-title">{{title}}</div>
          <div v-if="showClose" class="dialog-close" @click="close"></div>
        </header>
        <section class="dialog-body" tabindex="-1" ref="body" :class="[bodyClass]" :style="{height}">
          <slot></slot>
        </section>
        <footer v-if="showCancel||showOk||$slots.footer" class="dialog-footer">
          <slot name="footer">
            <cp-button type="normal" class="btn-cancel" @click="close">{{cancelText}}</cp-button>
            <cp-button type="primary" class="btn-ok ml-16" @click="$emit('ok')">{{okText}}</cp-button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
let $modal = document.querySelector('#dialog-modal')
if (!$modal) {
  $modal = document.createElement('div')
  $modal.setAttribute('id', 'dialog-modal')
  document.body.appendChild($modal)
}
// 记录当前打开了哪些页面，只记录zindex
const modalStack = []

let zIndex = 2000
function nextIndex () {
  return ++zIndex
}

export default {
  name: 'CpDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '880px'
    },
    maxWidth: {
      type: String
    },
    height: String,
    headerClass: String,
    bodyClass: String,
    top: String,
    middle: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    beforeClose: Function,
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否可以通过esc键关闭弹框
    esc: {
      type: Boolean,
      default: true
    },
    // 是否append到body
    appendBody: Boolean,
    showCancel: {
      type: Boolean,
      default: true
    },
    showOk: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      // margin-top
      mtop: this.top,
      // z-index
      zIndex: nextIndex(),
      $dialog: null,
      show: false
    }
  },
  // computed: {
  //   computedStyle () {
  //     return {
  //       width: this.width
  //     }
  //   }
  // },
  watch: {
    visible: {
      immediate: true,
      handler (v, oldV) {
        if (v && !oldV) {
          this.$emit('open')
          $modal.style.display = 'block'
          document.addEventListener('keydown', this.onKeydown, false)
          // 窗口大小改变
          // window.addEventListener('resize', this.setMiddle)
          // this.setMiddle()
          modalStack.push(this.zIndex)
          this.$nextTick(() => {
            this.show = true
            this.$nextTick(() => {
              this.$refs.body.focus()
            })
          })
        } else if (!v && oldV) {
          this.removeStack()
          document.removeEventListener('keydown', this.onKeydown, false)
          // window.removeEventListener('resize', this.setMiddle)
          if (this.beforeClose) {
            this.beforeClose(this.doClose)
          }
          this.$emit('close')
          this.show = false
          this.$nextTick(() => {
            this.$emit('closed')
          })
        }
      }
    },
    top (v) {
      this.mtop = v
    }
  },
  methods: {
    removeStack () {
      modalStack.splice(modalStack.indexOf(this.zIndex), 1)
      if (!modalStack.length) {
        $modal.style.display = 'none'
      }
    },
    // setMiddle () {
    //   if (this.middle) {
    //     this.$nextTick(() => {
    //       if (this.$refs.dialog) {
    //         const th = document.body.clientHeight
    //         const eh = this.$refs.dialog.offsetHeight
    //         this.mtop = `${(th - eh) / 2}px`
    //       }
    //     })
    //   }
    // },
    onKeydown (e) {
      if (e.keyCode === 27) {
        if (this.zIndex === modalStack[modalStack.length - 1]) {
          this.close()
        }
      }
    },
    nextIndex () {
      this.zIndex = nextIndex()
    },
    close () {
      this.$emit('update:visible', false)
    }
  },
  mounted () {
    if (this.appendBody) {
      this.$nextTick(() => {
        document.body.appendChild(this.$el)
      })
    }
  },
  beforeDestroy () {
    this.removeStack()
  }
}
</script>

<style lang="postcss">
#dialog-modal {
  position: fixed;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 100%;
  background: var(--maskBg);
  z-index: 2000;
}
.cp-dialog {
  position: fixed;
  left: 0;
  top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  & .dialog-wrapper {
    display: flex;
    flex-direction: column;
    margin: 24px 0;
    background: var(--dialogBg);
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  & .dialog-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    height: 32px;
    width: 100%;
    font-size: 12px;
    border-bottom: 1px solid var(--borderLight);
  }
  & .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    border-radius: 2px;
    transition: all .3s ease-in-out;
    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 4px;
      top: 8px;
      width: 8px;
      height: 1px;
      background-color: var(--textMinor);
      transition: all .3s ease-in-out;
    }
    &::before {
      transform: scale(1.3) rotateZ(45deg);
    }
    &::after {
      transform: scale(1.3) rotateZ(-45deg);
    }
    &:hover {
      background-color: var(--dangerColor);
      box-shadow: 2px 2px 4px var(--dangerColor2);
      &::before,
      &::after {
        background-color: #fff;
      }
    }
  }
  & .dialog-body {
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    max-height: 100%;
    overflow: auto;
  }
  & .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 8px 16px;
    border-top: 1px solid var(--borderLight);
  }
}
.dialog-enter-active, .dialog-leave-active {
  transition: all .3s;
}
.dialog-enter, .dialog-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
