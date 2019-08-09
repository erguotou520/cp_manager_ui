<template>
  <div class="cp-empty flex-column flex-1 ai-center jc-center">
    <div>{{text||'暂无数据'}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CpEmpty',
  props: {
    text: String
  }
}
</script>
<style lang="postcss">
.cp-empty {
  color: var(--textGrey);
}
</style>
