<template>
	<v-dialog v-model="show" persistent max-width="340">
		<component :is="component" v-bind="props" v-on="events" @close-dialog="$emit('close-dialog')"></component>
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
	const show = computed(() => {
		return uiStore.getCustomDialog?.show
	})
	const component = computed(() => {
		return uiStore.getCustomDialog?.component
	})
	const props = computed(() => {
		return uiStore.getCustomDialog?.props
	})
	const events = computed(() => {
		return uiStore.getCustomDialog?.events || {}
	})
	
</script>
<style lang="scss" scoped></style>
