<template>
  <cp-dialog width="72vw" title="添加服务"
    v-bind="$props"
    v-on="$listeners"
    @ok="save">
    <cp-form class="px-16" ref="form">
      <div class="form-item" required>
        <label class="w-80">服务名称：</label>
        <cp-input v-model.trim="form.name" block type="text" maxlength="20" autofocus
          required placeholder="例如：docker-nginx" message="服务名称不能为空" />
      </div>
      <div class="form-item" required>
        <label class="w-80">执行命令：</label>
        <cp-input v-model.trim="form.command" block type="text" maxlength="200"
          required placeholder="例如：docker" message="执行命令不能为空" />
      </div>
      <div v-if="!form.args.length" class="form-item">
        <span class="w-80"></span>
        <cp-button type="primary" @click="addArg">添加参数</cp-button>
      </div>
      <div v-else class="form-item">
        <label class="w-80">执行参数：</label>
        <transition-group name="list-field" tag="div" class="args flex-1">
          <div v-for="(arg, argIndex) in form.args" :key="arg.uuid"
            class="flex list-field p-8">
            <div class="flex-1">
              <div class="form-item" required>
                <label class="w-80">参数键：</label>
                <cp-input v-model.trim="arg.key" block type="text" ref="argKey"
                  required placeholder="例如：-k" message="参数键不能为空" />
              </div>
              <div class="mt-16" v-show="expands[argIndex]">
                <div class="form-item" required>
                  <label class="w-80">参数值：</label>
                  <cp-checkbox v-model.trim="arg.enable" @change="v=>onValueChange(arg, v)">是否有值</cp-checkbox>
                </div>
                <template v-if="arg.value">
                  <div class="form-item">
                    <label class="w-80">{{arg.value.origin === 'select' ? '必选' : '必填'}}？：</label>
                    <cp-checkbox v-model="arg.value.required"/>
                  </div>
                  <div class="form-item" required>
                    <label class="w-80">值来源：</label>
                    <cp-select v-model.trim="arg.value.origin" block required placeholder="必选">
                      <option value="input">输入</option>
                      <option value="select">选择</option>
                    </cp-select>
                  </div>
                  <div class="form-item" required>
                    <label class="w-80">值类型：</label>
                    <cp-select v-model.trim="arg.value.type" block required placeholder="必选">
                      <option value="string">字符</option>
                      <option value="number">数字</option>
                    </cp-select>
                  </div>
                  <template v-if="arg.value.type === 'number'&&arg.value.origin==='input'">
                    <div class="form-item">
                      <label class="w-80">最大值：</label>
                      <cp-input v-model.trim="arg.value.max" block type="number" placeholder="最大数值" />
                    </div>
                    <div class="form-item">
                      <label class="w-80">最小值：</label>
                      <cp-input v-model.trim="arg.value.min" block type="number" placeholder="最小数值" />
                    </div>
                  </template>
                  <template v-if="arg.value.origin === 'select'">
                    <div class="form-item" required>
                      <label class="w-80">可选值：</label>
                      <div class="flex-1">
                        <div v-for="(item, itemIndex) in arg.value.list" :key="itemIndex" class="flex ai-center"
                          :class="{'mt-16':!!itemIndex}">
                          <cp-input :value="item" block :ref="`item-${argIndex}`"
                            @input="(v) => onInputItem(arg, itemIndex, v)"
                            :type="arg.value.type==='number' ? 'number' : 'text'"
                            required placeholder="添加可选值" message="可选值不能为空" />
                          <div class="item-tools ml-8 no-shrink">
                            <cp-icon v-if="itemIndex === arg.value.list.length - 1"
                              name="plus" width="20" height="20"
                              @click="addItem(arg, argIndex)" />
                            <cp-icon class="ml-8" name="minus" width="20" height="20"
                              @click="removeItem(arg, itemIndex)" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="form-item">
                    <label class="w-80">默认值：</label>
                    <cp-input v-if="arg.value.origin === 'input'" v-model.trim="arg.value.default" block
                      :type="arg.value.type==='number' ? 'number' : 'text'"
                      :max="arg.value.type==='number' ? arg.value.max : null"
                      :min="arg.value.type==='number' ? arg.value.min : null"
                      placeholder="参数默认值" />
                    <cp-select v-else-if="arg.value.origin === 'select'" v-model="arg.value.default" block placeholder="参数默认值">
                      <option value="">未选择</option>
                      <option v-for="item in arg.value.list" :key="item" :value="item">{{item}}</option>
                    </cp-select>
                  </div>
                </template>
              </div>
            </div>
            <div class="field-tools ml-12 mt-4 no-shrink">
              <cp-icon v-if="argIndex===form.args.length - 1"
                name="plus" title="新增"
                width="20" height="20" @click="addArg" />
              <cp-icon name="minus" width="20" height="20" title="移除"
                class="ml-8" @click="removeArg(argIndex)" />
              <cp-icon v-if="argIndex" name="arrow-down"
                width="20" height="20" title="上移"
                class="ml-8 reverse" @click="orderArg(argIndex, -1)" />
              <cp-icon v-if="argIndex!==form.args.length-1"
                name="arrow-down" width="20" height="20" title="下移"
                class="ml-8" @click="orderArg(argIndex, 1)" />
              <cp-icon name="expand" width="20" height="20"
                :title="expands[argIndex]?'收起':'展开'"
                class="ml-8" :class="{reverse:expands[argIndex]}"
                @click="toggleExpand(argIndex)"/>
            </div>
          </div>
        </transition-group>
      </div>
    </cp-form>
  </cp-dialog>
</template>
<script>
import uuid from 'uuid'
import { CPService } from 'cp_core'
import { merge, clone } from 'vtc'
import { serviceStore } from '@/store'

function getForm () {
  return {
    name: '',
    command: '',
    args: []
  }
}

export default {
  props: {
    visible: Boolean,
    service: CPService,
    index: Number
  },
  data () {
    return {
      form: getForm(),
      expands: []
    }
  },
  methods: {
    addArg () {
      if (this.$refs.form.validate()) {
        this.form.args.push(
          {
            uuid: uuid.v4(),
            key: '',
            enable: true,
            value: { required: false, origin: 'input', type: 'string', default: '', list: [null] }
          }
        )
        this.expands.push(true)
        this.$nextTick(() => {
          this.$refs.argKey[this.form.args.length - 1].$el.focus()
        })
      }
    },
    onValueChange (arg, enable) {
      if (enable) {
        arg.value = { required: false, origin: 'input', type: 'string', default: '', list: [null] }
      } else {
        arg.value = null
      }
    },
    removeArg (index) {
      this.form.args.splice(index, 1)
      this.expands.splice(index, 1)
    },
    addItem (arg, argIndex) {
      if (arg.value.list.every(item => item !== '' && item !== null && item !== undefined)) {
        arg.value.list.push(null)
        this.$nextTick(() => {
          this.$refs[`item-${argIndex}`][arg.value.list.length - 1].$el.focus()
        })
      } else {
        this.$notify('请先填写空白项')
      }
    },
    removeItem (arg, index) {
      arg.value.list.splice(index, 1)
    },
    onInputItem (arg, index, v) {
      arg.value.list[index] = arg.value.type === 'number' ? +v : v
    },
    toggleExpand (argIndex) {
      this.$set(this.expands, argIndex, !this.expands[argIndex])
    },
    // 交换顺序
    orderArg (argIndex, direction) {
      const curr = this.form.args.splice(argIndex, 1)[0]
      this.form.args.splice(argIndex + direction, 0, curr)
    },
    save () {
      if (this.$refs.form.validate()) {
        if (!this.service) {
          if (serviceStore.addService(this.form)) {
            this.close()
          } else {
            this.$notify('添加失败，可能是存在相同的服务')
          }
        } else {
          if (serviceStore.updateService(this.index, this.form)) {
            this.close()
          } else {
            this.$notify('更新失败')
          }
        }
      }
    },
    close () {
      this.$emit('update:visible', false)
    }
  },
  created () {
    if (this.service) {
      const _serv = clone(this.service, true)
      merge(this.form, _serv)
      this.expands = Array.from({ length: this.service.args.length }, () => false)
    }
  },
  beforeDestroy () {
    this.form = merge(this.form, getForm())
  }
}
</script>
<style lang="postcss" scoped>
.field-tools {
  width: 112px;
}
.item-tools {
  width: 48px;
  text-align: right;
}
</style>
