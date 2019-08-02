<template>
  <input class="cp-input" :class="{invalid}"
    v-model="model"
    v-bind="$attrs"
    @invalid.prevent="onInvalid"
    @keydown="onKeydown">
</template>
<script>
import { isString } from 'vtc'
export default {
  name: 'CpInput',
  props: {
    value: [String, Number],
    trim: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      invalid: false
    }
  },
  computed: {
    model: {
      get () {
        return this.trim && this.value && isString(this.value) ? this.value.trim() : this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    onInvalid () {
      this.invalid = true
      this.$emit('invalid')
    },
    onKeydown (e) {
      this.invalid = false
      this.$emit('keydown')
    },
    checkValidity () {
      return this.$el.checkValidity()
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
