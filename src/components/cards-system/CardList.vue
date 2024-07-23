<template>
	<div class="wrapper-list-container">
		<div class="list-container">
			<component :is="getComponent()" v-for="item in items" :key="item.id" :cardData="item" />		
		</div>
		<div class="wrapper-add-button">
		<v-btn v-if="props.addButton" class="add-button" icon="mdi-plus" color="primary" @click="addCard()"></v-btn>
	</div>
	</div>
	
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import TipoUnidadCard from './TipoUnidadCard.vue';
import { uiStore } from '@/main';
import TipoUnidadCardDialog from './TipoUnidadCardDialog.vue';
import ArticuloCard from './ArticuloCard.vue';
import ArticuloCardDialog from './ArticuloCardDialog.vue';
import TipoEstablecimientoCard from './TipoEstablecimientoCard.vue';
import TipoEstablecimientoCardDialog from './TipoEstablecimientoCardDialog.vue';
import EstablecimientoCardDialog from './EstablecimientoCardDialog.vue';
import EstablecimientoCard from './EstablecimientoCard.vue';
import router from '@/router';
export default defineComponent({
	name: 'CardList'
})
</script>
<script setup lang="ts">
import type TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
const props = defineProps({
	items: Array<TipoUnidad>,
	component: String,
	addButton: {
		type: Boolean,
		default: true
	}
})
const getComponent = () => {
	switch(props.component) {
		case 'TipoUnidadCard':
			return TipoUnidadCard
		case 'ArticuloCard':
			return ArticuloCard
		case 'TipoEstablecimientoCard':
			return TipoEstablecimientoCard
		case 'EstablecimientoCard':
			return EstablecimientoCard
	}
}

const getComponentDialog = () => {
	switch(props.component) {
		case 'TipoUnidadCard':
			return TipoUnidadCardDialog
		case 'ArticuloCard':
			return ArticuloCardDialog
		case 'TipoEstablecimiento':
			return TipoEstablecimientoCardDialog
		case 'EstablecimientoCard':
			return EstablecimientoCardDialog
	}
}

const addCard = () => {
	if (props.component === 'EstablecimientoCard') {
		router.push('/establecimiento-edicion')
	} else {
		uiStore.showCustomDialog({
			component: markRaw(getComponentDialog() as object),
			props: {
				adding: true,
				data: {
					borrable: true
				}
			}
		})
	}
}

</script>
<style lang="scss" scoped>
.wrapper-list-container {
	display: flex;
	justify-content: center;
}

.list-container {
	display: inline-flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin: 0 auto;
	margin-bottom: 60px; // salvar boton de añadir
}

.wrapper-add-button {
	position: fixed;
	height: 50px;
	width: 100%;
	bottom: 10px;
}
.add-button {
	position: absolute;
	right: 16px;
	
}

</style>
