<template>
	<detail-toolbar @onBack="onBack" @onEdit="setEdicion" @onDelete="runDelete" />
	<div class="form">
		<div class="header">
			<div>
				<h2>{{ data.nombre }}</h2>
			</div>
			<div>
				<h3>{{ data.descripcion }}</h3>
			</div>
		</div>
		<div class="body">
			<div class="inputGroup">
				<div class="labelFor">Unidades de medida: </div>
				<div v-for="tipoUnidad in data.tiposUnidad">{{ tipoUnidad.nombre }}</div>
			</div>
      <div v-if="data.tienePrecios">
        <div class="inputGroup">
          <label class="labelFor">Histórico de precios</label>
        </div>
        <!-- <v-btn variant="text" color="primary" @click="introducirPrecio()">Introducir precio de compra</v-btn> -->
        <HistoricoPrecios :precios="data.precios"></HistoricoPrecios>
      </div>
		</div>
	</div>
</template>

<script setup lang="ts">
import getArticuloById from '@/services/articulo/getArticuloById.service'
import { useRoute } from 'vue-router'
import router from '@/router'
import DetailToolbar from '@/components/DetailToolbar.vue'
import { eventStore, modelStore } from '@/main'
import type Articulo from '@/services/articulo/models/Articulo'
import type Precio from '@/services/precio/models/Precio'
import getByArticuloId from '@/services/precio/getPrecioByArticuloId.service'
import deleteItem from '@/services/articulo/deleteArticulo.service'
import { sort } from '@/utils/utils'
import HistoricoPrecios from '@/components/HistoricoPrecios.vue'

// Props
defineProps({
	adding: {
		type: Boolean,
		default: false,
	},
})
const route = useRoute()
// Data
const data: Articulo = (await getArticuloById(route.params['id'].toString())).data as Articulo
const precios: Precio[] = (((await getByArticuloId(data.id)).data) as Precio[]).sort(sort('fechaCompra'))
data.precios = precios

// Methods
const onBack = () => {
	router.push(eventStore.getRoutes.list)
}

const setEdicion = () => {
  modelStore.articulo = data
	router.push(eventStore.getRoutes.edit)
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
