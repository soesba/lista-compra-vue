<template>
	<v-card @click="editCard()">
		<v-card-title>
			<div>
				{{ cardData.nombre }}
			</div>
			<v-icon icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-icon>
		</v-card-title>
		<v-card-text>{{ cardData.descripcion }}</v-card-text>
		<!--<v-card-text class="text-small">Creado: {{ cardData.fechaCreacion }}</v-card-text>
		 <v-card-actions>
			<v-btn icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-btn>
			<v-btn icon="mdi-delete-circle" color="secondary" @click="deleteCard()" :disabled="!canDelete"></v-btn>
		</v-card-actions> -->
	</v-card>
</template>

<script lang="ts">
	import { eventCardStore, uiStore } from '@/main'
	import { defineComponent } from 'vue'
import router from '@/router'
	export default defineComponent({
		name: 'ArticuloCard',
	})
</script>
<script setup lang="ts">
	import ArticuloCardDialog from './ArticuloCardDialog.vue'
	import type Articulo from '@/services/articulo/models/Articulo'
	import type { PropType } from 'vue'
	import { computed, ref, markRaw } from 'vue'

	// Props
	const props = defineProps({
		cardData: {
			type: Object as PropType<Articulo>,
			default() {
				return {}
			},
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
		router.push(`/articulo-detalle/${data.value.id}`)
	}

	const deleteCard = () => {
		console.log(data)
		uiStore.showConfirmDialog({
			props: {
				text: '¿Desea eliminar el elemento?',
				title: 'Confirmación',
			},
			aceptarFn: onCloseConfirmDialog,
		})
	}

	const onCloseConfirmDialog = () => {
		eventCardStore.deleteCard(data.value)
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
