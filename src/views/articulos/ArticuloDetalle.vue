<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-arrow-left" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
		<template v-slot:right>
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
			<div class="text-h6">{{ data.nombre }}</div>
			<div class="text-body-2">{{ data.descripcion }}</div>
		</div>
		<div class="body">			
			<div class="inputGroup">
				<div class="labelFor">Unidades de medida: </div>
				<div class="text-body-1" v-for="tipoUnidad in data.tiposUnidad">{{  tipoUnidad.nombre }}</div>
			</div>
			<div class="inputGroup">
				<label class="labelFor">Histórico</label>
			</div>
			<HistoricoPrecios :precios="precios"></HistoricoPrecios>			
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { computed } from 'vue'
	import router from '@/router'
	import getById from '@/services/articulo/getArticuloById.service'
	import { useRoute } from 'vue-router'
	import DetalleToolbar from '@/components/DetalleToolbar.vue'
	import { eventCardStore, uiStore } from '@/main'
	import type Articulo from '@/services/articulo/models/Articulo'
	import type Precio from '@/services/precio/models/Precio'
	import getByArticuloId from '@/services/precio/getPrecioByArticuloId.service'
	import { pluralize, sort } from '@/utils/utils'
	import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
	export default defineComponent({
		name: 'ArticuloDetalle',
	})
</script>
<script setup lang="ts">
	

	// Props
	const props = defineProps({
		// data: {
		//   type: Object as PropType<Establecimiento>,
		// 	default: modelStore.establecimiento
		// },
		adding: {
			type: Boolean,
			default: false,
		},
	})
	const route = useRoute()
	// Data
	let data: Articulo = (await getById(route.params['id'].toString())).data as Articulo
	const precios: Precio[] = (((await getByArticuloId(data.id)).data) as Precio[]).sort(sort('fechaCompra'))

	// Computed
	const canDelete = computed(() => {
		return data.borrable
	})
	
	// Methods
	const onBack = () => {
		router.push('/articulos')
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

	.tabla-historico {
		width: 100%;
		margin-left: 1%;
		margin-right: 1%;
		text-align: left;
		th {
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.6;
			letter-spacing: 0.0071428571em;
		}
		td {
			padding: 0px 5px;
			font-size: 0.875rem;
			font-weight: 400;
			line-height: 1.425;
			letter-spacing: 0.0178571429em;
		}
	}
</style>
