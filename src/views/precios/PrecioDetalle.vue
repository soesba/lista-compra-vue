<template>
	<detail-toolbar @onBack="onBack" @onEdit="setEdicion" @onDelete="runDelete" >
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
	import { defineComponent, reactive } from 'vue'
	import router from '@/router'
	import getPrecioById from '@/services/precio/getPrecioById.service'
	import { useRoute } from 'vue-router'
	import { formatDecimal, pluralize } from '@/utils/utils'
	import PrecioEquivalenciaComponent from '@/components/PrecioEquivalenciaComponent.vue'
  import { modelStore } from '@/main'
import deleteItem from '@/services/precio/deletePrecio.service'

	export default defineComponent({
		name: 'CompraDetalle'
	})
</script>
<script setup lang="ts">
	import DetailToolbar from '@/components/DetailToolbar.vue'
	import type Precio from '@/services/precio/models/Precio'

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

	// Methods
	const onBack = () => {
		router.push('/precios')
	}

  const setEdicion = () => {
    modelStore.precio = data
    router.push('/precio-edicion')
  }

  const runDelete = (cardData: any) => {
	if (cardData.borrable) {
		deleteItem(cardData.id).then(response => {
			if (response.respuesta === 200) {
				console.log("🚀 ~ deleteItem ~ response:", response)
				onBack()
			}
		})
	}
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
