<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-arrow-left" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
		<template v-slot:right>
			<v-btn icon="mdi-pencil" variant="text" color="primary" @click="setEdicion()"></v-btn>
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
			<label class="text-h6">{{ data.fechaCompra }} {{ data.establecimiento?.nombre }} {{ data.factura }}</label>
		</div>
		<div class="body">
			<div class="inputGroup">
				<label class="labelFor">Categoría</label>
				<label>{{ data.establecimiento?.nombre }}</label>
			</div>
			<div class="inputGroup">
				<label class="labelFor">Direcciones</label>
				<label v-if="!mostrarArticulos"> No hay direcciones </label>
			</div>
      <div v-if="mostrarArticulos" v-for="articulo in data.articulos" class="inputGroup indent">
        <label>{{articulo.articulo.nombre}}</label>
        <label>{{articulo.cantidad}}</label>
        <label>{{articulo.precioUnitario}}</label>
      </div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { computed } from 'vue'
	import router from '@/router'
	import getById from '@/services/compra/getCompraById.service'
	import { useRoute } from 'vue-router'
	export default defineComponent({
		name: 'CompraDetalle',
	})
</script>
<script setup lang="ts">
	import DetalleToolbar from '@/components/DetalleToolbar.vue'
	import type Compra from '@/services/compra/models/Compra'
	import { eventCardStore, noLogoUrl, uiStore } from '@/main'

	// Props
	const props = defineProps({
		// data: {
		//   type: Object as PropType<Compra>,
		// 	default: modelStore.compra
		// },
		adding: {
			type: Boolean,
			default: false,
		},
	})
	const route = useRoute()
	// Data
	let data: Compra = (await getById(route.params['id'].toString())).data as Compra
	// Computed
	const mostrarArticulos = computed(() => {
		return data.articulos.length !== 0
	})
	const canDelete = computed(() => {
		return data.borrable
	})

	// Methods
	const onBack = () => {
		router.push('/compras')
	}

	const setEdicion = () => {
		router.push(`/compra-edicion/${data.id}`)
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
