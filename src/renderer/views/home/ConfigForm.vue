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
        <cp-checkbox v-model="notEmpty">{{notEmpty ? '创建非空配置' : '创建空配置'}}</cp-checkbox>
      </div>
      <div v-if="notEmpty&&!configs.length" class="form-item">
        <label class="w-80"></label>
        <cp-button type="primary" @click="addItem">添加参数值</cp-button>
      </div>
      <transition-group v-if="notEmpty && configs.length"
        name="list-field" tag="div" class="configs flex-1 mt-16">
        <div v-for="(item, itemIndex) in configs" :key="item.key" class="flex list-field p-8">
          <div class="flex-1">
            <div class="form-item">
              <label class="w-80">参数键：</label>
              <cp-select :value="item.key" block placeholder="请选择"
                @change="onConfigChange">
                <option :value="item.key">{{item.key}}</option>
                <option v-for="_key in restKeys" :key="_key.key" :value="_key.key">{{_key.key}}</option>
              </cp-select>
            </div>
            <div class="form-item" :required="argsMap[item.key].required">
              <label class="w-80">参数值：</label>
              <cp-input v-if="argsMap[item.key].origin === 'input'"
                v-model="item.value" block
                :required="argsMap[item.key].required"
                :type="argsMap[item.key].type === 'number' ? 'number' : 'text'"
                :max="argsMap[item.key].type==='number' ? argsMap[item.key].max : null"
                :min="argsMap[item.key].type==='number' ? argsMap[item.key].min : null"
                :placeholder="argsMap[item.key].default ? `默认值：${argsMap[item.key].default}` : '请输入'" />
              <cp-select v-else-if="argsMap[item.key].origin === 'select'"
                v-model="item.value" block
                :required="argsMap[item.key].required"
                :placeholder="argsMap[item.key].default ? `默认值：${argsMap[item.key].default}` : '请选择'">
                <option v-for="_item in argsMap[item.key].list" :key="_item" :value="_item">{{_item}}</option>
              </cp-select>
            </div>
          </div>
          <div class="field-tools ml-12 mt-4 no-shrink">
            <cp-icon v-if="itemIndex===configs.length - 1&&restKeys.length"
              name="plus" title="新增"
              width="20" height="20" @click="addItem()" />
            <cp-icon v-if="!argsMap[item.key].required" name="minus" width="20" height="20" title="移除"
              class="ml-8" @click="removeItem(itemIndex)" />
          </div>
        </div>
      </transition-group>
    </cp-form>
  </cp-dialog>
</template>
<script>
import { CPService, CPConfig } from 'cp_core'
export default {
  props: {
    visible: Boolean,
    service: {
      type: CPService,
      required: true
    },
    config: CPConfig,
    index: Number
  },
  data () {
    return {
      notEmpty: true,
      configs: []
    }
  },
  computed: {
    argsMap () {
      return this.service.args.reduce((map, arg) => {
        map[arg.key] = arg
        return map
      }, {})
    },
    restKeys () {
      return this.service.args.reduce((arr, arg, index) => {
        if (arg.enable) {
          if (!this.configs.some(item => item.key === arg.key)) {
            arr.push({ key: arg.key, index })
          }
        }
        return arr
      }, [])
    }
  },
  methods: {
    addItem (key) {
      if (!key) {
        const arg = this.service.args[this.restKeys[0].index]
        this.configs.push({ key: arg.key, value: null })
      } else {
        this.configs.push({ key, value: null })
      }
    },
    removeItem (index) {
      this.configs.splice(index, 1)
    },
    onConfigChange () {

    },
    save () {

    }
  },
  created () {
    // auto add required
    this.service.args.forEach(arg => {
      if (arg.required) {
        this.addItem(arg.key)
      }
    })
  }
}
</script>
<style lang="postcss" scoped>

</style>
