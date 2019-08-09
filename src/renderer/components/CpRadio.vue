 <template>
  <label class="cp-radio" :class="{disabled}">
    <input type="radio" :name="name" :disabled="disabled" :value="data" v-model="model">
    <span><slot></slot></span>
  </label>
</template>
<script>
import radioMixin from './radio'

export default {
  name: 'CpRadio',
  mixins: [radioMixin],
  props: {
    data: [String, Number, Boolean]
  }
}
</script>
<style lang="postcss">
.cp-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  & > input[type=radio] {
    -webkit-appearance: none;
    position: relative;
    margin: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid var(--borderColor);
    transition: all .3s ease-in-out;
    cursor: pointer;
    & + span {
      margin-left: 4px;
      transition: all .3s ease-in-out;
    }
    &::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 4px;
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--borderColor);
      opacity: 0;
      transform: scale3d(1.5, 1.5, 1);
      transition: all .3s ease-in-out;
    }
    &:checked {
      border-color: var(--primaryColor);
      &::after {
        background-color: var(--primaryColor);
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }
  }
  &.disabled {
    cursor: default;
    & > input[type=radio] {
      border-color: var(--disabledBg);
      &::after {
        background-color: var(--disabledBg);
      }
      & + span {
        color: var(--disabledBg);
      }
    }
  }

  & + .cp-radio {
    margin-left: 16px;
  }
}
</style>
