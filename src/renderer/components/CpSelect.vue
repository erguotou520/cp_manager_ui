<template>
  <select class="cp-select" :class="{invalid}"
    v-model="model"
    v-bind="$attrs"
    @invalid.prevent="invalid=true"
    @change="invalid=false;$emit('change')">
    <option v-if="$attrs.placeholder" value="" disabled selected hidden>{{$attrs.placeholder}}</option>
    <slot></slot>
  </select>
</template>
<script>
import inputMixin from './input'
export default {
  name: 'CpSelect',
  mixins: [inputMixin]
}
</script>
<style lang="postcss">
.cp-select {
  position: relative;
  padding: 0 10px;
  height: 28px;
  border: 1px solid var(--borderColor);
  border-radius: 2px;
  font-size: 12px;
  background: var(--defaultBg);
  -webkit-appearance: none;
  outline: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='rgba(0,0,0,0.5)' width='12' height='3' viewBox='0 0 12 3' xmlns='http://www.w3.org/2000/svg'><path d='M3,3a.5.5,0,0,1-.31-.11L.19.89A.5.5,0,0,1,.81.11L3,1.86,5.19.11a.5.5,0,1,1,.63.78l-2.5,2A.5.5,0,0,1,3,3Z'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 12px;
  color: var(--textDefault);
  &[block] {
    width: 100%;
  }
  &:focus {
    border-color: var(--primaryColor);
  }
  &:invalid {
    color: var(--dangerColor);
  }
  &.invalid {
    border-color: var(--dangerColor);
  }
  & option {
    color: var(--textDefault);
  }
}
</style>
