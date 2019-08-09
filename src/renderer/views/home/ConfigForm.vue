<template>
  <cp-dialog width="72vw" title="添加配置"
    v-bind="$props"
    v-on="$listeners"
    @ok="save">
    <cp-form class="px-16" ref="form">
      <div class="form-item" required>
        <label class="w-80">当前服务：</label>
        <span>{{service.name}}</span>
      </div>
      <div class="form-item" required>
        <label class="w-80">执行命令：</label>
        <span class="t-trunc">{{service.command}}</span>
      </div>
      <div class="form-item">
        <cp-radio v-model="empty" name="config" :data="true">空配置</cp-radio>
        <cp-radio v-model="empty" name="config" :data="false">非空配置</cp-radio>
      </div>
      <div v-for="(arg, index) in service.args" :key="index" class="flex p-8">

      </div>
    </cp-form>
  </cp-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    service: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      empty: false
    }
  },
  methods: {
    save () {

    }
  }
}
</script>
<style lang="postcss" scoped>

</style>
