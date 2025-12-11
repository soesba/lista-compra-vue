<template>
  <div class="wrapper">
    <div class="left">
      <v-btn icon="mdi-arrow-left" @click="back" variant="text" color="primary"></v-btn>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <v-btn :disabled="editDisabled" variant="text" color="primary" @click="setEdicion()"
        >Editar</v-btn
      >
      <v-btn :disabled="deleteDisabled" variant="text" color="error" @click="confirmDelete()"
        >Eliminar</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { uiStore } from '@/main'

  defineProps({
    deleteDisabled: {
      type: Boolean,
      default: false
    },
    editDisabled: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['onBack', 'onDelete', 'onEdit'])

  // Methods
  const back = () => {
    emit('onBack')
  }

  const confirmDelete = () => {
    uiStore.showActionDialog({
      props: {
        text: '¿Desea eliminar el elemento?',
        title: 'Confirmación'
      },
      aceptarFn: onCloseActionDialog
    })
  }

  const onCloseActionDialog = () => {
    emit('onDelete')
  }

  const setEdicion = () => {
    emit('onEdit')
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      flex: 0.33;
      justify-content: flex-start;
    }
    .center {
      display: flex;
      flex: 0.33;
      justify-content: center;
    }
    .right {
      display: flex;
      flex: 0.33;
      justify-content: flex-end;
    }
  }
</style>
