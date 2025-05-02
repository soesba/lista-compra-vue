<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-arrow-left" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
		<template v-slot:right>
      <v-btn icon="mdi-pencil" variant="text" color="primary" @click="setEdicion()"></v-btn>
			<v-btn icon="mdi-delete" variant="text" color="primary" @click="confirmDeleteCard()" v-if="canDelete"></v-btn>
		</template>
	</detalle-toolbar>
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

<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import getArticuloById from '@/services/articulo/getArticuloById.service'
import { useRoute } from 'vue-router'
import DetalleToolbar from '@/components/DetalleToolbar.vue'
import { uiStore, modelStore } from '@/main'
import type Articulo from '@/services/articulo/models/Articulo'
import type Precio from '@/services/precio/models/Precio'
import getByArticuloId from '@/services/precio/getPrecioByArticuloId.service'
import deleteItem from '@/services/articulo/deleteArticulo.service'
import { sort } from '@/utils/utils'
import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
export default defineComponent({
	name: 'ArticuloDetalle',
})
</script>
<script setup lang="ts">

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

// Computed
const canDelete = computed(() => {
	return data.borrable
})

// Methods
const onBack = () => {
	router.push('/articulos')
}

const setEdicion = () => {
  modelStore.articulo = data
	router.push('/articulo-edicion')
}

const confirmDeleteCard = () => {
	uiStore.showConfirmDialog({
		props: {
			text: '¿Desea eliminar el elemento?',
			title: 'Confirmación',
		},
		aceptarFn: onCloseConfirmDialog,
	})
}

const onCloseConfirmDialog = () => {
	deleteCard(data)
}

const deleteCard = (cardData: any) => {
	if (cardData.borrable) {
		deleteItem(cardData.id).then(response => {
			if (response.respuesta === 200) {
				console.log("🚀 ~ deleteItem ~ response:", response)
				onBack()
			}
		})
	}
}

const introducirPrecio = () => {
	router.push('/precio-edicion')
}

</script>
<style lang="scss" scoped>

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
