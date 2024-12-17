<template>
	<v-card  class="cursor" @click="editCard()">
		<v-card-title>{{ cardData.nombre }}</v-card-title>
		<v-card-subtitle>{{ cardData.abreviatura }}</v-card-subtitle>
		<v-card-text class="text-small">Creado: {{ cardData.fechaCreacion }}</v-card-text>
		<v-card-actions>
			<!-- <v-btn icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-btn> -->
			<v-btn icon="mdi-delete-circle" color="secondary" @click="deleteCard()" :disabled="!canDelete"></v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { eventCardStore, uiStore } from '@/main'
import { defineComponent } from 'vue'
import router from '@/router'
export default defineComponent({
	name: 'TipoUnidadCard',
})
</script>
<script setup lang="ts">
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
const data = ref(props.cardData)
// Computed
const canDelete = computed(() => {
	return props.cardData.borrable
})
// Methods
const editCard = () => {
	router.push(`/tiposUnidades-edicion/${data.value.id}`)
}

const deleteCard = () => {
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
