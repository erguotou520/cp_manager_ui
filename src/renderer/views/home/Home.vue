<template>
  <div class="v-home p-16 flex-column">
    <div class="flex ai-center mb-16">
      <cp-button type="primary" @click="showService()">添加服务</cp-button>
      <cp-button class="ml-16" type="primary" :disabled="!!selectedService">添加配置</cp-button>
    </div>
    <div class="table flex flex-1 hide-y">
      <div v-if="!services.length" class="empty flex-column flex-1 ai-center jc-center">
        <div>暂无服务，点击按钮开始添加</div>
        <cp-button type="primary" class="mt-12" @click="showService()">添加服务</cp-button>
      </div>
      <template v-else>
        <div class="left flex-column">
          <div class="row header">
            <div class="col">服务</div>
          </div>
          <div class="table-body flex-column flex-1">
            <scrolly class="flex-column flex-1">
              <scrolly-viewport>
                <div v-for="n in 20" :key="n" class="row">
                  <div class="col" :class="{selected:selectedService===n}" @click="onSelectService(n)">服务</div>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y"></scrolly-bar>
            </scrolly>
          </div>
        </div>
        <div class="right flex-column">
          <div class="row header">
            <div class="col" :style="style[0]">配置</div>
              <div class="col" :style="style[1]">状态</div>
              <div class="col" :style="style[2]">PID</div>
              <div class="col" :style="style[3]">操作</div>
          </div>
          <div class="table-body flex-column flex-1">
            <scrolly class="flex-column flex-1">
              <scrolly-viewport>
                <div v-for="n in 20" :key="n" class="row">
                  <div class="col" :style="style[0]">配置</div>
                  <div class="col" :style="style[1]">状态</div>
                  <div class="col" :style="style[2]">PID</div>
                  <div class="col" :style="style[3]">操作</div>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y"></scrolly-bar>
            </scrolly>
          </div>
        </div>
      </template>
    </div>
    <service-form v-if="serviceVisible" :visible.sync="serviceVisible" />
  </div>
</template>

<script>
import ServiceForm from './ServiceForm.vue'
export default {
  components: {
    ServiceForm
  },
  data () {
    return {
      style: [
        { flex: 1 },
        { width: '100px' },
        { width: '100px' },
        { width: '120px' }
      ],
      selectedService: -1,
      services: [],
      onlyRunning: false,
      runningTasks: [1],
      serviceVisible: false
    }
  },
  methods: {
    onSelectService (n) {
      this.selectedService = n
    },
    showService () {
      this.serviceVisible = true
    }
  }
}
</script>
<style lang="postcss">
.v-home {
  --colorTable: #ccc;
  --colorCol: #e8e8e8;
  height: 100%;
  & .empty {
    color: var(--textGrey);
  }
  & .table {
    width: 100%;
    height: 100%;
    border: 1px solid var(--colorTable);
    border-radius: 2px;
    overflow-x: hidden;
  }
  & .left {
    flex: 1;
    border-right: 1px solid var(--colorTable);
  }
  & .right {
    flex: 2;
  }
  & .row {
    display: flex;
    height: 32px;
    border-bottom: 1px solid var(--colorCol);
    &.header {
      font-weight: 700;
      background: #f3f3f3;
    }
  }
  & .col {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 7px;
    border-right: 1px solid var(--colorCol);
    &:last-child {
      border-right: none;
    }
    &.selected {
      background: rgba(160, 234, 169, 0.3);
    }
  }
  & .table-body {
    /* margin-right: -3px;
    padding-right: 3px; */
    flex: 1;
    margin-bottom: -1px;
    overflow-y: auto;
    /* & .row:last-child {
      border-bottom: none;
    } */
  }
}
</style>
