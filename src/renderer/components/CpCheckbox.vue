<template>
  <label class="cp-checkbox" :class="{disabled}">
    <input type="checkbox" :name="name" v-model="model" :disabled="disabled" :true-value="trueValue" :false-value="falseValue">
    <span><slot></slot></span>
  </label>
</template>
<script>
import radioMixin from './radio'

export default {
  name: 'CpCheckbox',
  mixins: [radioMixin],
  props: {
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  }
}
</script>
<style lang="postcss">
.cp-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  & > input[type=checkbox] {
    position: relative;
    width: 16px;
    height: 16px;
    margin: 0;
    border: 1px solid var(--borderColor);
    cursor: pointer;
    & + span {
      margin-left: 8px;
    }
    &::after {
      content: '';
      position: absolute;
      left: 3px;
      top: 4px;
      display: block;
      width: 8px;
      height: 4px;
      transform: rotateZ(-45deg);
    }
    &:checked {
      background: var(--primaryColor);
      border-color: var(--primaryColor);
      &::after {
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
      }
    }
  }
  &.disabled {
    cursor: default;
    & > input[type=checkbox] {
      background-color: var(--disabledColor);
      border-color: var(--borderColor);
      &::after {
        border-left-color: var(--textDefault);
        border-bottom-color: var(--textDefault);
      }
      & + span {
        color: var(--disabledColor);
      }
    }
  }
}
</style>
