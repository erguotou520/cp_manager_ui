<template>
  <input class="cp-input" :class="{invalid}"
    v-model="model"
    v-bind="$attrs"
    @invalid.prevent="onInvalid"
    @keydown="onKeydown">
</template>
<script>
import inputMixin from './input'
export default {
  name: 'CpInput',
  mixins: [inputMixin],
  methods: {
    onKeydown (e) {
      this.invalid = false
      this.$emit('keydown')
    }
  }
}
</script>
<style lang="postcss">
.cp-input {
  -webkit-appearance: none;
  height: 28px;
  padding: 4px 8px;
  border: 1px solid var(--borderColor);
  border-radius: 2px;
  transition: all .3s ease-in-out;
  &[block] {
    width: 100%
  }
  &:focus {
    border-color: var(--primaryColor);
  }
  &.invalid {
    border-color: var(--dangerColor);
  }
}
</style>
