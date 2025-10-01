<template>
  <v-alert v-model="show" :icon="icon" closable :text="text" :variant="variant" :type="type"></v-alert>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { uiStore } from '@/main';
export default defineComponent({
	name: 'AlertComponent'
})
</script>
<script setup lang="ts">
// Computed
const show = computed({
  get () {
	  return uiStore.getAlertComponent?.show
  },
  set (newValue) {
    if (newValue === false) {
      uiStore.hideAlertComponent()
    }
  }
})
const text = computed(() => {
	return uiStore.getAlertComponent?.props.text
})
// success, info, warning, error
const type = computed(() => {
  console.log(uiStore.getAlertComponent?.props.type)
	return uiStore.getAlertComponent?.props.type
})
const variant = computed(() => {
	return uiStore.getAlertComponent?.props.variant
})
const icon = computed(() => {
	return type.value === 'error' ? 'mdi-alert-circle-outline' : ''
})

onMounted(() => {
	const vAlert = document.getElementsByClassName('v-alert__close')[0]
	const iconClose = vAlert?.getElementsByClassName('mdi-close')[0]
	iconClose?.addEventListener('click', () => {
		uiStore.hideAlertComponent()
	})
})
</script>
<style lang="scss" scoped>
  .v-alert {
    --v-theme-error: 229, 115, 115;
    position: fixed;
    z-index: 100;
    width: 100%;
  }
</style>
