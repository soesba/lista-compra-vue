<template>
	<v-card>
		<v-card-title>{{ cardData.nombre }}</v-card-title>
		<v-card-subtitle>{{ cardData.tipoEstablecimiento.nombre }}</v-card-subtitle>
		<v-card-text class="text-small">Creado: {{ cardData.fechaCreacion }}</v-card-text>
		<v-card-actions>
			<v-btn icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-btn>
			<v-btn icon="mdi-delete-circle" color="secondary" @click="deleteCard()" :disabled="!canDelete"></v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
	import { eventCardStore, uiStore } from '@/main'
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'EstablecimientoCard',
	})
</script>
<script setup lang="ts">
	import EstablecimientoCardDialog from './EstablecimientoCardDialog.vue'
	import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
	import type { PropType } from 'vue'
	import { computed, ref, markRaw } from 'vue'
	
	// Props
	const props = defineProps({
		cardData: {
			type: Object as PropType<Establecimiento>,
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
		uiStore.showCustomDialog({
			component: markRaw(EstablecimientoCardDialog),
			props: {
				data: data					
			}
		})
	}

	const deleteCard = () => {
		console.log(data)
		uiStore.showConfirmDialog({
			props: {
				text: '¿Desea eliminar el elemento?',
				title: 'Confirmación'
			},
			aceptarFn: onCloseConfirmDialog
		})
	}

	const onCloseConfirmDialog = () => {
		eventCardStore.deleteCard(data.value)
	}
</script>
<style lang="scss" scoped>
.v-card {
	margin: 10px;
}</style>
