<template>
	<v-card class="cursor">
		<v-card-title>
			<div @click="detalleCard()">
				{{ data.articulo?.nombre }}
			</div>
			<v-icon icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-icon>
		</v-card-title>
		<v-card-text class="text-small" @click="detalleCard()">
			Establecimiento: {{ data.establecimiento?.nombre }} <br>
			Última fecha compra: {{ getFechaCompra }} <br>
			Precio: {{ getPrecio }}
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import { eventCardStore, modelStore, uiStore } from '@/main'
	import { defineComponent } from 'vue'
import router from '@/router'
	export default defineComponent({
		name: 'PrecioCard',
	})
</script>
<script setup lang="ts">
	import type Precio from '@/services/precio/models/Precio'
	import type { PropType } from 'vue'
	import { computed } from 'vue'

	// Props
	const props = defineProps({
		cardData: {
			type: Object as PropType<Precio>,
			default() {
				return {}
			},
		},
	})
	// Data
	let data = { ...props.cardData}
	
	// Computed
	const canDelete = computed(() => {
		return props.cardData.borrable
	})
	const getPrecio = computed(() => {
		return props.cardData ? props.cardData.precio?.toFixed(2).concat(' €') : null
	})
	const getFechaCompra = computed(() => {
		return props.cardData.fechaCompra ? new Intl.DateTimeFormat('es-ES', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(props.cardData.fechaCompra) : ''
	})
	// Methods
	const editCard = () => {
		router.push(`/precio-edicion/${data.id}`)
	}

	const detalleCard = () => {
		router.push(`/precio-detalle/${data.id}`)
	}	
</script>
<style lang="scss" scoped>
	.v-card {
		margin: 10px;
		.v-card-title {
			display: flex;
			flex-direction: row;
			div:first-of-type {
				flex: 2;
			}
		}
	}
</style>
