<template>
  <v-dialog v-model="show" persistent max-width="340">
    <v-card max-width="400" prepend-icon="mdi-help" :text="text" :title="title">
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
    return uiStore.getConfirmDialog?.show
  })
  const title = computed(() => {
    return uiStore.getConfirmDialog?.props.title
  })
  const text = computed(() => {
    return uiStore.getConfirmDialog?.props.text
  })

  // Methods
  const onCloseDialog = (accept: boolean) => {
    uiStore.hideConfirmDialog()
    if (accept) {
      uiStore.getConfirmDialog?.aceptarFn()
    }
  }
</script>
<style lang="scss" scoped>
  .v-card {
    color: rgb(var(--v-theme-primary));
  }
</style>
