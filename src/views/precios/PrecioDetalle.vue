<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-arrow-left" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
		<template v-slot:right>
			<!-- <v-btn icon="mdi-pencil" variant="text" color="primary" @click="setEdicion()"></v-btn> -->
			<v-btn
				icon="mdi-delete"
				variant="text"
				color="primary"
				@click="deleteCard()"
				v-if="canDelete"
			></v-btn>
		</template>
	</detalle-toolbar>
	<div class="form">
		<div class="header">
			<div class="text-h6">{{ data.articulo?.nombre }}</div>
			<div class="text-body-2">{{ data.marca }}</div>
		</div>
		<div class="body">
			<div class="inputGroup">
				<div class="labelFor">Establecimiento </div>
				<label>{{ data.establecimiento?.nombre }}</label>
			</div>
			<div class="inputGroup">
				<div class="labelFor">Medidas: </div>
				<div class="text-body-1" v-for="tipoUnidad in data.unidadesMedida">{{  tipoUnidad.valor }} {{ pluralize(tipoUnidad.nombre, tipoUnidad.valor) }}</div>
			</div>
			<div class="inputGroup">
				<div class="labelFor">Precio: </div>
				<label>{{ formatDecimal(data.precio) }}</label>
			</div>
		</div> 
	</div>
</template>

<script lang="ts">
	import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
	import { defineComponent } from 'vue'
	import { computed } from 'vue'
	import router from '@/router'
	import getById from '@/services/precio/getPrecioById.service'
	import { useRoute } from 'vue-router'
	import { formatDecimal, pluralize, sort } from '@/utils/utils'
	import getByArticuloId from '@/services/precio/getPrecioByArticuloId.service'
	export default defineComponent({
		name: 'CompraDetalle',
	})
</script>
<script setup lang="ts">
	import DetalleToolbar from '@/components/DetalleToolbar.vue'
	import type Precio from '@/services/precio/models/Precio'
	import { eventCardStore, modelStore, noLogoUrl, uiStore } from '@/main'

	// Props
	const props = defineProps({
		// data: {
		//   type: Object as PropType<Precio>,
		// 	default: modelStore.precio
		// },
		adding: {
			type: Boolean,
			default: false,
		},
	})
	const route = useRoute()
	// Data
	let data: Precio = (await getById(route.params['id'].toString())).data as Precio
	// Computed
	const canDelete = computed(() => {
		return data.borrable
	})

	// Methods
	const onBack = () => {
		router.push('/precios')
	}

	const setEdicion = () => {
		router.push(`/precio-edicion/${data.id}`)
	}

	const deleteCard = () => {
		uiStore.showConfirmDialog({
			props: {
				text: '¿Desea eliminar el elemento?',
				title: 'Confirmación',
			},
			aceptarFn: onCloseConfirmDialog,
		})
	}

	const onCloseConfirmDialog = () => {
		eventCardStore.deleteCard(data)
	}
</script>
<style lang="scss" scoped>
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.logo {
		width: 150px;
	}
  .indent {
    margin-left: 20px;
  }

  .inputGroup {
		align-items: center;
  }
</style>
