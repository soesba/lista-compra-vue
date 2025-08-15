<template>
	<Dialog v-model="show" persistent max-width="340">
		<Card max-width="400" prepend-icon="mdi-help" :text="text" :title="title" color="primary">
			<template #footer>
				<Button class="ms-auto" label="Aceptar" @click="onCloseDialog(true)"></Button>
				<Button class="ms-auto" label="Cancelar" @click="onCloseDialog(false)"></Button>
			</template>
		</Card>
	</Dialog>
</template>

<script lang="ts">
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import { Button } from 'primevue';
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
	return uiStore.getConfirmDialog?.visible
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
