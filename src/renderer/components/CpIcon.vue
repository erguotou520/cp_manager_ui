<template>
  <svg class="cp-icon"
    :class="[$listeners.click?'act':'']"
    v-bind="$attrs"
    v-on="$listeners">
    <title v-if="title">{{title}}</title>
    <use :xlink:href="icon" />
  </svg>
</template>
<script>
// 引入所有svg图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg
const req = require.context('../assets/icons', true, /\.svg$/)
requireAll(req)

export default {
  name: 'CpIcon',
  props: {
    title: String,
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon () {
      return `#icon-${this.name}`
    }
  }
}
</script>
<style lang="postcss">
.cp-icon {
  flex-shrink: 0;
  color: var(--textDefault);
  transition: all .3s ease-in-out;
  &.act {
    cursor: pointer;
    &:hover {
      color: var(--textPrimary);
    }
  }
  & path,
  & rect,
  & line,
  & circle {
    fill: currentColor;
    stroke: currentColor;
  }
}
</style>
