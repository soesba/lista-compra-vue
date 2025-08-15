<template>
<Drawer
      v-model:visible="drawerVisible"
    >
    <div class="drawer-item" v-for="item in items" :key="item.title">
      <div class="drawer-item-title">
        <router-link :to="item.props.to" class="no-link" @click.stop="drawerVisible = false">
          {{item.title}}
        </router-link>
        </div>
    </div>
    </Drawer>
</template>
<script setup lang="ts">
import Drawer from 'primevue/drawer'
import { computed } from 'vue'

interface DrawerItem {
  title: string,
  props: Record<string, any>
}

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array<DrawerItem>,
    default: () => []
  }
})

const drawerVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => {
    emit('update:visible', value)
  }
})
</script>
<style lang="scss" scoped>
.drawer-item {
  padding-inline: 16px;
  min-height: 48px;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
}

.drawer-item-title {
  font-size: 16px;
  font-weight: 500;
  -webkit-hyphens: auto;
  hyphens: auto;
  overflow-wrap: normal;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: normal;
  word-wrap: break-word;
}
</style>
