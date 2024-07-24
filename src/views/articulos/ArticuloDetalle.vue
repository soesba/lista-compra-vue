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
		<div class="body">
			<label class="text-h6">{{ data.nombre }}</label>
			<label class="text-h6">{{ data.descripcion }}</label>
			<div class="inputGroup">
				<label class="labelFor">Histórico</label>
			</div>
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
	import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
	import { eventCardStore, noLogoUrl, uiStore } from '@/main'
	import type Articulo from '@/services/articulo/models/Articulo'
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
</style>
