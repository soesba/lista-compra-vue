<template>
	<v-card :title="cardData.nombre" :subtitle="cardData.abreviatura">
		<v-card-actions>
			<v-btn icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-btn>
			<v-btn icon="mdi-delete-circle" color="secondary" :disabled="!canDelete"></v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
	import { eventCardStore, uiStore } from '@/main'
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'TipoUnidadCard',
	})
</script>
<script setup lang="ts">
	import TipoUnidadCardDialog from './TipoUnidadCardDialog.vue'
	import type TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
	import type { PropType } from 'vue'
	import { computed, ref, markRaw } from 'vue'
	
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
	// Computed
	const canDelete = computed(() => {
		return props.cardData.borrable
	})
	// Methods
	const editCard = () => {
		uiStore.showDialog({
			component: markRaw(TipoUnidadCardDialog),
			props: {
				data: data					
			}
		})
	}
</script>
<style lang="scss" scoped>
.v-card {
	margin: 10px;
}</style>
