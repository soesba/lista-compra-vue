<template>
  <v-dialog v-model="show" persistent max-width="340">
    <v-card max-width="400" :prepend-icon="icon" :text="text" :title="title">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Aceptar" @click="onCloseDialog(true)"></v-btn>
        <v-btn class="ms-auto" text="Cancelar" @click="onCloseDialog(false)"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { uiStore } from '@/main'
  import { computed } from 'vue'

  // Computed
  const show = computed(() => {
    return uiStore.getActionDialog?.show
  })
  const title = computed(() => {
    return uiStore.getActionDialog?.props.title
  })
  const text = computed(() => {
    return uiStore.getActionDialog?.props.text
  })
  const icon = computed(() => {
    if (uiStore.getActionDialog?.props.showIcon ?? true) {
      return uiStore.getActionDialog?.props.type === 'done' ? 'mdi-check-circle-outline' : 'mdi-help-circle-outline'
    } else {
      return ''
    }
  })

  // Methods
  const onCloseDialog = (accept: boolean) => {
    uiStore.hideActionDialog()
    if (accept) {
      uiStore.getActionDialog?.aceptarFn()
    }
  }
</script>
<style lang="scss" scoped>
  .v-card {
    color: rgb(var(--v-theme-primary));
  }
  :deep(.v-card-item) {
    justify-content: flex-start;
  }
  :deep(.v-card-text) {
    color: rgb(var(--v-theme-on-surface));
  }
</style>
