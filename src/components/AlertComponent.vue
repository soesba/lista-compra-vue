<template>
  <v-alert v-if="show" :icon="icon" closable :text="text" :variant="variant" :type="type"></v-alert>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useUiStore } from '@/store';
export default defineComponent({
	name: 'AlertComponent'
})
</script>
<script setup lang="ts">
const uiStore = useUiStore()
// Computed
const show = computed(() => {
	return uiStore.getAlertComponent?.visible
})
const text = computed(() => {
	return uiStore.getAlertComponent?.props.text
})
const type = computed(() => {
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
    position: fixed;
    z-index: 100;
    width: 100%;
  }
</style>
