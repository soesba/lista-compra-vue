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
	}
}

const getComponentDialog = () => {
	switch(props.component) {
		case 'TipoUnidadCard':
			return TipoUnidadCardDialog
	}
}

const addCard = () => {
	uiStore.showCustomDialog({
		component: markRaw(getComponentDialog() as object),
		props: {
			adding: true,
			data: {}
		}
	})
}

</script>
<style lang="scss" scoped>
.wrapper-list-container {
	display: flex;
	justify-content: center;
}

.card-list-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: column;
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
