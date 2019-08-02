<template>
  <a-modal destroyOnClose width="80vw" v-bind="$props" title="添加服务" v-on="$listeners">
    <a-form :form="form" @submit="save">
      <a-form-item label="服务名称" required :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input placeholder="服务名称" v-decorator="[
          'name',
          { rules: [{ required: true , message: '请输入服务名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="执行命令" required :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input placeholder="例如：docker" v-decorator="[
          'command',
          { rules: [{ required: true , message: '请输入服务命令' }] }
          ]"
        />
      </a-form-item>
      <a-button v-if="!form.getFieldValue('args').length" icon="plus" @click="addArg">添加参数</a-button>
      <a-form-item
        v-for="(k, index) in form.getFieldValue('args')"
        :key="k.key"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? '执行参数' : ''"
        :required="false"
      >
        <a-row>
          <a-col :span="18">
            <a-form-item label="参数键" required :label-col="argLabelCol" :wrapper-col="argWrapperCol">
              <a-input placeholder="例如：-k" v-decorator="[
                `key[${k}]`,
                { rules: [{ required: true, whitespace: true,  message: '请输入参数属性' }] }
              ]"/>
            </a-form-item>
            <a-form-item label="参数值" required :label-col="argLabelCol" :wrapper-col="argWrapperCol">
              <a-checkbox v-decorator="[
                `enable[${k}]`
              ]" />
            </a-form-item>
            <template v-if="k.enable">
              <a-form-item label="值来源" required>
                <a-radio-group v-decorator="['origin', { initialValue: 'input' }]">
                  <a-radio value="input">输入</a-radio>
                  <a-radio value="select">选择</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="值类型" required>
                <a-radio-group v-decorator="['type', { initialValue: 'string' }]">
                  <a-radio value="string">字符串</a-radio>
                  <a-radio value="number">数字</a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-icon class="action-button"
              type="minus-circle-o"
              @click="() => remove(k)"
            />
            <a-icon class="action-button"
              type="plus-circle-o"
              @click="() => remove(k)"
            />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: Boolean
  },
  data () {
    const labelCol = {
      span: 4
    }
    const wrapperCol = {
      span: 14,
      offset: 1
    }
    return {
      form: this.$form.createForm(this),
      labelCol,
      wrapperCol,
      argLabelCol: {
        span: 4
      },
      argWrapperCol: {
        span: 18,
        offset: 1
      },
      formItemLayout: {
        labelCol,
        wrapperCol: {
          span: 19,
          offset: 1
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          span: 24
        }
      }
    }
  },
  methods: {
    addArg () {
      this.form.setFieldsValue({
        args: [
          { key: '' }
        ]
      })
    },
    save () {

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
