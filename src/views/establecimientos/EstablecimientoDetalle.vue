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
			<v-img class="logo" :src="getImageSrc"></v-img>
			<label class="text-h6">{{ data.nombre }}</label>
		</div>
		<div class="body">
			<div class="inputGroup">
				<label class="labelFor">Categoría</label>
				<label>{{ data.tipoEstablecimiento.nombre }}</label>
			</div>
			<div class="inputGroup">
				<label class="labelFor">Direcciones</label>
				<label v-if="!mostrarDirecciones"> No hay direcciones </label>
			</div>
      <div v-if="mostrarDirecciones" v-for="direcccion in data.direcciones" class="inputGroup indent">
        <label>{{direcccion.direccion}}</label>
        <label>{{direcccion.poblacion}}</label>
        <label>{{direcccion.codPostal}}</label>
        <v-btn v-if="direcccion.favorita"
          icon="mdi-star"
          variant="text"
          color="primary"
        ></v-btn>
      </div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import getById from '@/services/establecimiento/getEstablecimientoById.service'
import { useRoute } from 'vue-router'
export default defineComponent({
	name: 'EstablecimientoDetalle',
})
</script>
<script setup lang="ts">
import DetalleToolbar from '@/components/DetalleToolbar.vue'
import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
import { eventCardStore, noLogoUrl, uiStore } from '@/main'

// Props
defineProps({
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
const data: Establecimiento = (await getById(route.params['id'].toString())).data as Establecimiento
// Computed
const getImageSrc = computed(() => {
	return data.logo ? data.logo.content : noLogoUrl
})
const mostrarDirecciones = computed(() => {
	return data.direcciones.length !== 0
})
const canDelete = computed(() => {
	return data.borrable
})

// Methods
const onBack = () => {
	router.push('/establecimientos')
}

const setEdicion = () => {
	router.push(`/establecimiento-edicion/${data.id}`)
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
