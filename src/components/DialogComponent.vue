<template>
	<v-dialog v-model="show" persistent max-width="340">
		<component :is="component" v-bind="props"></component>
	</v-dialog>
</template>

<script lang="ts">
	import { uiStore } from '@/main'
	import { computed, defineComponent } from 'vue'
	export default defineComponent({
		name: 'DialogComponent',
	})
</script>
<script setup lang="ts">
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
</script>
<style lang="scss" scoped></style>
