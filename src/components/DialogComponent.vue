<template>
	<DynamicDialog v-model="show" modal>
		<component :is="component" v-bind="props" v-on="events" @close-dialog="$emit('close-dialog')"></component>
	</DynamicDialog>
</template>

<script lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';
import { useUiStore } from '@/store';
import { computed, defineComponent } from 'vue'
export default defineComponent({
	name: 'DialogComponent',
})
</script>
<script setup lang="ts">
const uiStore = useUiStore()
// Computed
const show = computed(() => {
	return uiStore.getCustomDialog?.visible
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
