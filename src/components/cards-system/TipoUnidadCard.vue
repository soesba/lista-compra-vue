<template>
	<v-card v-if="!editing" :title="cardData.nombre" :subtitle="cardData.abreviatura">
		<v-card-actions>
			<v-btn icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-btn>
			<v-btn icon="mdi-delete-circle" color="secondary" :disabled="!canDelete"></v-btn>
		</v-card-actions>
	</v-card>
	<!-- <TipoUnidadCardDialog
		:data="cardData"
		@cancelEdit="cancelEdit"
		@saveEdit="saveEdit(data)"
	></TipoUnidadCardDialog> -->
</template>

<script lang="ts">
	import { uiStore } from '@/main'
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'TipoUnidadCard',
	})
</script>
<script setup lang="ts">
	import TipoUnidadCardDialog from './TipoUnidadCardDialog.vue'
	import type TipoUnidad from '@/services/TipoUnidad/models/TipoUnidad'
	import type { PropType } from 'vue'
	import { computed, watch, ref, markRaw } from 'vue'
	// Props
	const props = defineProps({
		cardData: {
			type: Object as PropType<TipoUnidad>,
			default() {
				return {}
			}
		},
	})
	// Data
	let data = ref(props.cardData)
	const editing = ref(false)
	// Watch
	watch(data, async (newData, oldData) => {
		console.log('🚀 ~ watch ~ newData, oldData:', newData, oldData)
	})
	// Computed
	const canDelete = computed(() => {
		return props.cardData.borrable
	})
	// Methods
	const editCard = () => {
		toggleEditCard()
	}

	const cancelEdit = () => {
		data = ref(props.cardData)
		toggleEditCard()
	}

	const saveEdit = (data: TipoUnidad) => {
		console.log(data)
		toggleEditCard()
	}

	const toggleEditCard = () => {
		editing.value = !editing.value
		uiStore.showDialog({
			component: markRaw(TipoUnidadCardDialog),
			props: {
				data: data
			}
		})
	}
</script>
<style lang="scss" scoped></style>
