import Vue from 'vue'
// import { Button, Switch, Modal, Form, Input, Checkbox, Row, Col, Icon } from 'ant-design-vue'
import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly'
import CpButton from './CpButton'
import CpDialog from './CpDialog'
import CpForm from './CpForm'
import CpInput from './CpInput'

// Vue.use(Button)
// Vue.use(Switch)
// Vue.use(Modal)
// Vue.use(Form)
// Vue.use(Form.Item)
// Vue.use(Input)
// Vue.use(Checkbox)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Icon)

Vue.component(Scrolly.name, Scrolly)
Vue.component(ScrollyViewport.name, ScrollyViewport)
Vue.component(ScrollyBar.name, ScrollyBar)

Vue.component(CpButton.name, CpButton)
Vue.component(CpDialog.name, CpDialog)
Vue.component(CpForm.name, CpForm)
Vue.component(CpInput.name, CpInput)
