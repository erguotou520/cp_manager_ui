export default {
  props: {
    disabled: Boolean,
    name: String,
    value: [String, Number, Boolean]
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
        this.$emit('change', v)
      }
    }
  }
}
