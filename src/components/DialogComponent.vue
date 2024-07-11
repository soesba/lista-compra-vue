<template>
	<v-dialog v-model="show" persistent max-width="340">
		<component :is="component" v-bind="props" v-on="events"></component>
	</v-dialog>
</template>

<script lang="ts">
	import { uiStore } from '@/main'
	import { computed, defineComponent, watch } from 'vue'
	export default defineComponent({
		name: 'DialogComponent',
	})
</script>
<script setup lang="ts">
	const emit = defineEmits(['showDialog', 'hideDialog'])
	// Computed
	const dialog = computed(() => {		
		return uiStore.getDialog
	})
	const show = computed(() => {
		return uiStore.getDialog?.show
	})
	const component = computed(() => {
		return uiStore.getDialog?.component
	})
	const props = computed(() => {
		return uiStore.getDialog?.props
	})
	const events = computed(() => {
		return uiStore.getDialog?.events
	})
	// Watch
	watch(show, (newValue, oldValue) => {
		if (newValue) {
			emit('showDialog')
		} else {
			emit('hideDialog')
		}
	})
</script>
<style lang="scss" scoped></style>
