<template>
	<div class="wrapper-list-container" :class="props.class">
		<div class="list-container">
			<component :is="getComponent()" v-for="item in items" :key="item.id" :cardData="item" />
		</div>
		<div class="wrapper-add-button">
			<v-fab
				icon="mdi-plus"
				class="ms-4"
				location="bottom end"
				absolute
				offset
				color="primary"
				@click="addCard()"
			></v-fab>
			<!-- <v-btn
				v-if="props.addButton"
				class="add-button"
				icon="mdi-plus"
				color="primary"
				@click="addCard()"
			></v-btn> -->
			
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, markRaw } from 'vue'
	import TipoUnidadCard from './TipoUnidadCard.vue'
	import { uiStore } from '@/main'
	import TipoUnidadCardDialog from './TipoUnidadCardDialog.vue'
	import ArticuloCard from './ArticuloCard.vue'
	import ArticuloCardDialog from './ArticuloCardDialog.vue'
	import TipoEstablecimientoCard from './TipoEstablecimientoCard.vue'
	import TipoEstablecimientoCardDialog from './TipoEstablecimientoCardDialog.vue'
	import EstablecimientoCard from './EstablecimientoCard.vue'
	import router from '@/router'
import PrecioCard from './PrecioCard.vue'
	export default defineComponent({
		name: 'CardList',
	})
</script>
<script setup lang="ts">
	const props = defineProps({
		items: Array<any>,
		component: String,
		addButton: {
			type: Boolean,
			default: true,
		},
		class: {
			type: String,
			default: 'card',
		},
	})
	const getComponent = () => {
		switch (props.component) {
			case 'TipoUnidadCard':
				return TipoUnidadCard
			case 'ArticuloCard':
				return ArticuloCard
			case 'TipoEstablecimientoCard':
				return TipoEstablecimientoCard
			case 'EstablecimientoCard':
				return EstablecimientoCard
			case 'PrecioCard': 
			return PrecioCard
		}
	}

	const getComponentDialog = () => {
		switch (props.component) {
			case 'TipoUnidadCard':
				return TipoUnidadCardDialog
			case 'ArticuloCard':
				return ArticuloCardDialog
			case 'TipoEstablecimientoCard':
				return TipoEstablecimientoCardDialog
		}
	}

	const addCard = () => {
		if (props.component === 'EstablecimientoCard') {
			router.push('/establecimiento-edicion')
		} else if (props.component === 'PrecioCard') {
			router.push('/precio-edicion')
		} else {
			uiStore.showCustomDialog({
				component: markRaw(getComponentDialog() as object),
				props: {
					adding: true,
					data: {
						borrable: true,
					},
				},
			})
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper-list-container {
		.wrapper-add-button {
			position: fixed;
			width: 100%;
			bottom: 40px;
			right: 20px;
		}
		&.card {
			display: flex;
			justify-content: center;
			.list-container {
				display: inline-flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin: 0 auto;
				margin-bottom: 60px; // salvar boton de añadir
			}
			
		}
		&.list {
			.list-container {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				// align-content: center;
				flex-wrap: wrap;
				margin: 0 auto;
				margin-bottom: 60px; // salvar boton de añadir
			}
		}
	}
	
	
</style>
