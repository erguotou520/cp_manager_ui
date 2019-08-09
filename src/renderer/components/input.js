import { isString } from 'vtc'

export default {
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
    checkValidity () {
      return this.$el.checkValidity()
    }
  }
}
