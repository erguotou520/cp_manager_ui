<template>
  <button class="cp-button" :class="{clicked}" v-bind="$attrs"
    @click="onClick">
    <slot />
    <transition name="clicked" @after-enter="clicked=false">
      <span v-if="clicked" class="ripple"></span>
    </transition>
  </button>
</template>
<script>
export default {
  name: 'CpButton',
  data () {
    return {
      clicked: false
    }
  },
  methods: {
    onClick () {
      this.clicked = true
      this.$emit('click')
    }
  }
}
</script>
<style lang="postcss">
.cp-button {
  -webkit-appearance: none;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  width: 108px;
  height: 28px;
  padding: 2px 6px;
  border-radius: 2px;
  border: 1px solid var(--textGrey);
  color: var(--textDefault);
  transition: all .3s ease-in-out;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: var(--primaryColor);
    border-color: var(--primaryColor);
  }
  &[type=primary] {
    background: var(--primaryColor);
    color: #fff;
    border: none;
    &:hover {
      background: var(--primaryColor1);
    }
    & .ripple {
      background: var(--primaryColor);
    }
  }
  &[disabled] {
    background: var(--disabledBg);
    cursor: default;
    &:hover,
    &.clicked {
      background: var(--disabledBg);
    }
  }
  & .ripple {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 2px;
    transform: scale3d(1.15, 1.4, 1);
    z-index: -1;
    &.clicked-enter-active {
      transition: all .3s ease-in-out;
    }
    &.clicked-enter {
      opacity: 0.6;
      transform: scale(1);
    }
  }
}
</style>
