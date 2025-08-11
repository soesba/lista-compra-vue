<template>
	<detail-toolbar>
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
				v-if="canDelete"></v-btn>
		</template>
	</detail-toolbar>
	<div class="form">
		<div class="header">
			<div class="text-h6">{{ data.articulo?.nombre }}</div>
			<div class="text-body-2">{{ data.marca }}</div>
		</div>
		<div v-if="data.precio" class="body">
			<div class="inputGroup">
				<div class="labelFor">Establecimiento</div>
				<label>{{ data.establecimiento?.nombre }}</label>
			</div>
			<div class="inputGroup">
				<div class="labelFor">Medidas:</div>
				<div class="labelData" v-for="tipoUnidad in data.unidadesMedida">
					{{ tipoUnidad.valor }} {{ pluralize(tipoUnidad.nombre, tipoUnidad.valor) }}
				</div>
			</div>
			<div class="inputGroup">
				<div class="labelFor">Precio:</div>
				<label>{{ formatDecimal(data.precio) }}</label>
			</div>
			<PrecioEquivalenciaComponent :unidades-medida="data.unidadesMedida" :precio="data.precio" />
		</div>
		<div v-else class="body">No hay precios introducidos</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive, computed } from 'vue'
	import router from '@/router'
	import getPrecioById from '@/services/precio/getPrecioById.service'
	import { useRoute } from 'vue-router'
	import { formatDecimal, pluralize } from '@/utils/utils'
	import PrecioEquivalenciaComponent from '@/components/PrecioEquivalenciaComponent.vue'
  import { modelStore } from '@/main'

	export default defineComponent({
		name: 'CompraDetalle'
	})
</script>
<script setup lang="ts">
	import DetailToolbar from '@/components/DetailToolbar.vue'
	import type Precio from '@/services/precio/models/Precio'
	import { eventStore, uiStore } from '@/main'

	// Props
	defineProps({
		adding: {
			type: Boolean,
			default: false
		}
	})
	const route = useRoute()
	// Data
	const data: Precio = reactive((await getPrecioById(route.params['id'].toString())).data as Precio)
	// Computed
	const canDelete = computed(() => {
		return data.borrable
	})

	// Methods
	const onBack = () => {
		router.push('/precios')
	}

  const setEdicion = () => {
    modelStore.precio = data
    router.push('/precio-edicion')
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
		eventStore.deleteCard(data)
	}
</script>
<style lang="scss" scoped>
	.logo {
		width: 150px;
	}
	.indent {
		margin-left: 20px;
	}

</style>
