<template>
	<v-dialog v-model="show" persistent max-width="340">
		<v-card max-width="400" prepend-icon="mdi-help" :text="text" :title="title" color="primary">
			<template v-slot:actions>
				<v-btn class="ms-auto" text="Aceptar" @click="onCloseDialog(true)"></v-btn>
				<v-btn class="ms-auto" text="Cancelar" @click="onCloseDialog"></v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { useUiStore } from '@/store';
	import { computed, defineComponent } from 'vue'
	export default defineComponent({
		name: 'ConfirmDialog',
	})
</script>
<script setup lang="ts">
	const uiStore = useUiStore()
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
<style lang="scss" scoped></style>
