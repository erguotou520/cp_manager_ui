<template>
  <span class="act-label">
    <slot></slot>
    <span class="tools">
      <slot name="tools"></slot>
    </span>
  </span>
</template>
<style lang="postcss">
.act-label {
  display: inline-flex;
  align-items: center;
  & .tools {
    margin-left: auto;
    opacity: 0;
    transition: all .3s ease-in-out;
    & svg {
      width: 20px;
      height: 20px;
      & + svg {
        margin-left: 4px;
      }
    }
  }
  &:hover {
    & .tools {
      opacity: 1;
    }
  }
}
</style>
