<template>
  <cp-dialog width="60vw" v-bind="$props" title="添加服务" v-on="$listeners">
    <cp-form class="px-16" ref="form" @submit="save">
      <div class="form-item" required>
        <label class="w-80">服务名称：</label>
        <cp-input v-model="form.name" block type="text" required placeholder="例如：docker-nginx" />
      </div>
      <div class="form-item" required>
        <label class="w-80">执行命令：</label>
        <cp-input v-model="form.command" block type="text" required placeholder="例如：docker" />
      </div>
      <div v-if="!form.args.length" class="form-item">
        <span class="w-80"></span>
        <cp-button type="primary" @click="addArg">添加参数</cp-button>
      </div>
      <div v-else class="form-item">
        <label class="w-80">执行参数：</label>
        <div class="args">
          <div v-for="arg in form.args" :key="arg.key" class="arg-item">

          </div>
        </div>
      </div>
    </cp-form>
  </cp-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean
  },
  data () {
    return {
      form: {
        name: '',
        command: '',
        args: []
      }
    }
  },
  methods: {
    addArg () {
      if (this.$refs.form.validate()) {
        this.form.args.push(
          { key: '', enable: true, origin: 'input', type: 'string', default: '' }
        )
      }
    },
    save () {
      alert(123)
    }
  },
  mounted () {

  }
}
</script>
<style lang="postcss" scoped>
.action-button {
  padding-top: 6px;
  font-size: 24px;
  cursor: pointer;
  color: var(--textMinor);
  & + .action-button {
    margin-left: 12px;
  }
  &:hover {
    color: var(--primaryColor);
  }
}
</style>
