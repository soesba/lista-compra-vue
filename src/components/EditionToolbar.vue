<template>
  <div class="wrapper">
    <div class="left">
      <Button icon="mdi-close" @click="back" variant="text" color="primary"></Button>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <Button variant="text" color="primary" @click="save()" :disabled="saveDisabled">Guardar</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'primevue';
export default defineComponent({
	name: 'EditionToolbar',
})
</script>
<script setup lang="ts">
import { defineComponent } from 'vue'

defineProps({
  saveDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onBack', 'onSave'])

// Methods
const back = () => {
  emit('onBack')
}

const save = () => {
  emit('onSave')
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
