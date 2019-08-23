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
      <div class="form-item" required>
        <label class="w-80">配置名称：</label>
        <cp-input v-model="form.name" block required type="text" maxlength="20" placeholder="例如：配置1" message="配置名称不能为空" />
      </div>
      <div class="form-item" required>
        <label class="w-80">配置分组：</label>
        <cp-select v-model="form.group" class="flex-1" maxlength="8" placeholder="选择一个分组">
          <option v-for="group in configStore.groups" :key="group" :value="group">{{group}}</option>
        </cp-select>
        <span class="mx-8">或者</span>
        <cp-input v-model="form.group" required class="flex-1" type="text" placeholder="新建一个分组" message="配置分组必填" />
      </div>
      <div class="form-item">
        <cp-checkbox v-model="notEmpty" :disabled="hasRequired">{{notEmpty ? '创建非空配置' : '创建空配置'}}</cp-checkbox>
      </div>
      <div v-if="notEmpty&&!configLength" class="form-item">
        <label class="w-80"></label>
        <cp-button type="primary" @click="addItem">添加参数值</cp-button>
      </div>
      <transition-group v-if="notEmpty && configLength"
        name="list-field" tag="div" class="configs flex-1 mt-16">
        <div v-for="(argValue, argKey, argIndex) in form.configs" :key="argKey" class="flex list-field p-8">
          <div class="flex-1">
            <div class="form-item">
              <label class="w-80">参数键：</label>
              <cp-select :value="argKey" block placeholder="请选择"
                @change="v=>onConfigChange(argKey,v)">
                <option :value="argKey">{{argKey}}</option>
                <option v-for="_key in restKeys" :key="_key.key" :value="_key.key">{{_key.key}}</option>
              </cp-select>
            </div>
            <div class="form-item" :required="argsMap[argKey].required">
              <label class="w-80">参数值：</label>
              <cp-input v-if="argsMap[argKey].origin === 'input'"
                :value="argValue" @input="v=>onValueChange(argKey, v)" block
                :required="argsMap[argKey].required"
                :type="argsMap[argKey].type === 'number' ? 'number' : 'text'"
                :max="argsMap[argKey].type==='number' ? argsMap[argKey].max : null"
                :min="argsMap[argKey].type==='number' ? argsMap[argKey].min : null"
                :placeholder="argsMap[argKey].default ? `默认值：${argsMap[argKey].default}` : '请输入'"
                :message="argsMap[argKey].required ? '参数值不能为空' : ''" />
              <cp-select v-else-if="argsMap[argKey].origin === 'select'"
                :value="argValue" @input="v=>onValueChange(argKey, v)" block
                :required="argsMap[argKey].required"
                :placeholder="argsMap[argKey].default ? `默认值：${argsMap[argKey].default}` : '请选择'"
                :message="argsMap[argKey].required ? '参数值不能为空' : '' ">
                <option v-for="_item in argsMap[argKey].list" :key="_item" :value="_item">{{_item}}</option>
              </cp-select>
            </div>
          </div>
          <div class="field-tools ml-12 mt-4 no-shrink">
            <cp-icon v-if="argIndex===configLength - 1&&restKeys.length"
              name="plus" title="新增"
              width="20" height="20" @click="addItem()" />
            <cp-icon v-if="!argsMap[argKey].required" name="minus" width="20" height="20" title="移除"
              class="ml-8" @click="removeItem(argKey)" />
          </div>
        </div>
      </transition-group>
    </cp-form>
  </cp-dialog>
</template>
<script>
import { CPService, CPConfig } from 'cp_core'
import { configStore } from '@/store'

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
      configStore,
      notEmpty: true,
      form: {
        name: '',
        group: configStore.groups.length ? '' : 'default',
        configs: {}
      }
    }
  },
  computed: {
    // 是否有必填字段
    hasRequired () {
      return this.service.args.some(arg => arg.value && arg.value.required)
    },
    // 配置数
    configLength () {
      return Object.keys(this.form.configs).length
    },
    // 参数map
    argsMap () {
      return this.service.args.reduce((map, arg) => {
        if (arg.value) {
          map[arg.key] = arg.value
        }
        return map
      }, {})
    },
    // 剩余可选的arg
    restKeys () {
      return this.service.args.reduce((arr, arg, index) => {
        if (arg.value) {
          if (!this.form.configs.hasOwnProperty(arg.key)) {
            arr.push({ key: arg.key, index })
          }
        }
        return arr
      }, [])
    }
  },
  methods: {
    // 添加配置
    addItem (key) {
      if (!key) {
        const arg = this.service.args[this.restKeys[0].index]
        this.$set(this.form.configs, arg.key, null)
      } else {
        this.$set(this.form.configs, key, null)
      }
    },
    // 删除配置
    removeItem (argKey) {
      this.$delete(this.form.configs, argKey)
    },
    // 配置值修改
    onValueChange (argKey, value) {
      this.form.configs[argKey] = value
    },
    // 参数选择变化时
    onConfigChange (argKey, value) {
      this.$delete(this.form.configs, argKey)
      this.$set(this.form.configs, value, null)
    },
    save () {
      if (this.$refs.form.validate()) {
        if (configStore.addConfig(this.service.uuid, this.form)) {
          this.close()
        } else {
          this.$notify('添加失败，可能是存在相同的服务')
        }
      }
    },
    close () {
      this.$emit('update:visible', false)
    }
  },
  created () {
    // auto add required
    this.service.args.forEach(arg => {
      if (arg.value && arg.value.required) {
        this.addItem(arg.key)
      }
    })
  }
}
</script>
<style lang="postcss" scoped>
.field-tools {
  width: 48px;
}
</style>
