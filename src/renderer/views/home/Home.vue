<template>
  <div class="v-home p-16 flex-column">
    <div class="flex ai-center mb-16">
      <cp-button type="primary" @click="addService()">添加服务</cp-button>
      <cp-button class="ml-16" type="primary"
        :disabled="!selectedService"
        @click="showConfig()">添加配置</cp-button>
    </div>
    <div class="table flex flex-1 hide-y">
      <cp-empty v-if="!serviceStore.services.length" text="暂无服务，点击按钮开始添加">
        <cp-button type="primary" class="mt-12" @click="addService()">添加服务</cp-button>
      </cp-empty>
      <template v-else>
        <!-- 服务 -->
        <div class="left flex-column">
          <div class="row header">
            <div class="col">服务</div>
          </div>
          <div class="table-body flex-column flex-1">
            <scrolly class="flex-column flex-1">
              <scrolly-viewport>
                <div v-for="(service, index) in serviceStore.services" :key="service.uuid" class="row">
                  <act-label class="col" :class="{selected:selectedService===service}">
                    <div class="flex-1 t-trunc" @click="onSelectService(service)">{{service.name}}</div>
                    <template #tools>
                      <cp-icon name="trash" title="删除" @mousedown.stop @click.stop="removeService(service, index)" />
                      <cp-icon name="edit" @mousedown.stop @click.stop="editService(service, index)" />
                    </template>
                  </act-label>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y"></scrolly-bar>
            </scrolly>
          </div>
        </div>
        <!-- 分组 -->
        <div v-if="selectedService && serviceConfigGroups.length" class="group flex-column">
          <div class="row header">
            <div class="col">分组</div>
          </div>
          <div class="table-body flex-column flex-1">
            <scrolly class="flex-column flex-1">
              <scrolly-viewport>
                <div v-for="group in serviceConfigGroups" :key="group" class="row">
                  <div class="col t-trunc" :class="{selected:selectedGroup===group}">{{group}}</div>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y" />
            </scrolly>
          </div>
        </div>
        <!-- 配置 -->
        <div v-if="selectedService&&groupConfigs.length" class="right flex flex-column">
          <div class="row header">
            <div class="col" :style="style[0]">配置</div>
              <div class="col" :style="style[1]">状态</div>
              <div class="col" :style="style[2]">PID</div>
              <div class="col" :style="style[3]">操作</div>
          </div>
          <div class="table-body flex-column flex-1">
            <scrolly class="flex-column flex-1">
              <scrolly-viewport>
                <div v-for="config in groupConfigs" :key="config.uuid" class="row">
                  <div class="col t-trunc" :style="style[0]">{{config.name}}</div>
                  <div class="col" :style="style[1]">状态</div>
                  <div class="col" :style="style[2]">PID</div>
                  <div class="col" :style="style[3]">操作</div>
                </div>
              </scrolly-viewport>
              <scrolly-bar axis="y" />
            </scrolly>
          </div>
        </div>
        <cp-empty v-else-if="!selectedService" class="right" text="请从左侧选择一个服务" />
        <cp-empty v-else class="right" text="暂无配置，点击按钮开始添加">
          <cp-button type="primary" class="mt-12" @click="showConfig()">添加配置</cp-button>
        </cp-empty>
      </template>
    </div>
    <service-form v-if="serviceVisible" :visible.sync="serviceVisible" :service="editingService" :index="editingServiceIndex" />
    <config-form v-if="configVisible" :visible.sync="configVisible" :service="selectedService" :config="editingConfig" :index="editingConfigIndex" />
  </div>
</template>

<script>
import { serviceStore, configStore } from '@/store'

import ActLabel from './ActLabel'
import ServiceForm from './ServiceForm'
import ConfigForm from './ConfigForm'

export default {
  components: {
    ActLabel,
    ServiceForm,
    ConfigForm
  },
  data () {
    return {
      style: [
        { flex: 1 },
        { width: '100px' },
        { width: '100px' },
        { width: '120px' }
      ],
      selectedService: null,
      selectedGroup: null,
      editingService: null,
      editingServiceIndex: -1,
      editingConfig: null,
      editingConfigIndex: -1,
      onlyRunning: false,
      runningTasks: [1],
      serviceVisible: false,
      configVisible: false,
      serviceStore,
      configStore
    }
  },
  computed: {
    serviceConfigGroups () {
      return this.serviceConfigs.reduce((groups, conf) => {
        if (!groups.includes(conf.group)) {
          groups.push(conf.group)
        }
        return groups
      }, [])
    },
    serviceConfigs () {
      if (!this.selectedService) return []
      return configStore.getServiceConfigs(this.selectedService.uuid) || []
    },
    groupConfigs () {
      if (!this.selectedGroup || !this.serviceConfigs.length) return []
      return this.serviceConfigs.filter(conf => conf.group === this.selectedGroup)
    }
  },
  methods: {
    onSelectService (service) {
      this.selectedService = service
      this.selectedGroup = this.serviceConfigGroups[0] || null
    },
    addService () {
      this.serviceVisible = true
      this.editingService = null
    },
    editService (service, index) {
      this.serviceVisible = true
      this.editingService = service
      this.editingServiceIndex = index
    },
    removeService (service, index) {
      this.$confirm('警告', `确定要删除服务 '${service.name}' 么？删除该服务将删除该服务下所有配置，请仔细确认！`)
        .then(() => {
          serviceStore.removeService(index)
        })
        .catch(() => {})
    },
    showConfig () {
      this.configVisible = true
    }
  }
}
</script>
<style lang="postcss">
.v-home {
  --colorTable: #ccc;
  --colorCol: #e8e8e8;
  height: 100%;
  & .table {
    width: 100%;
    height: 100%;
    border: 1px solid var(--colorTable);
    border-radius: 2px;
    overflow-x: hidden;
  }
  & .left {
    flex: 2;
    border-right: 1px solid var(--colorTable);
  }
  & .group {
    flex: 1;
    border-right: 1px solid var(--colorTable);
  }
  & .right {
    flex: 5;
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
    padding: 0 16px 0 8px;
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
