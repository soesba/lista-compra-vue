<template>
  <div class="wrapper">
    <div class="left">
      <v-btn icon="mdi-arrow-left" @click="back" variant="text" color="primary"></v-btn>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <v-btn variant="text" color="primary" @click="setEdicion()">Editar</v-btn>
      <v-btn :disabled="deleteDisabled" variant="text" color="error" @click="confirmDelete()" >Eliminar</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'DetailToolbar',
})
</script>
<script setup lang="ts">
import { defineComponent } from 'vue'
import { uiStore } from '@/store/instances'

defineProps({
  deleteDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onBack', 'onDelete', 'onEdit'])

// Methods
const back = () => {
  emit('onBack')
}

const confirmDelete = () => {
	uiStore.showConfirmDialog({
		props: {
			text: '¿Desea eliminar el elemento?',
			title: 'Confirmación',
		},
		aceptarFn: onCloseConfirmDialog,
	})
}

const onCloseConfirmDialog = () => {
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
    justify-content: center
  }
  .right {
    display: flex;
    flex: 0.33;
    justify-content: flex-end;
  }
}
</style>
