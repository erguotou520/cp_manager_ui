<template>
  <button class="cp-button" :class="{clicked}" v-bind="$attrs"
    @click="onClick"
    @transitionend="clicked=false">
    <slot />
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
    &.clicked {
      &::after {
        /* content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 6px solid var(--primaryColor2); */
      }
      /* box-shadow: 4px 4px 10px var(--primaryColor2); */
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
}
</style>
