<template>
	<div class="list-container">
		<component :is="getComponent()" v-for="item in items" :key="item.id" :cardData="item" @saveCard="onSaveCard" />		
	</div>
	<v-btn v-if="props.addButton" class="add-button" icon="mdi-plus" color="primary" @click="addCard()"></v-btn>
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
const emit = defineEmits(['saveCard'])
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

const onSaveCard = (data: TipoUnidad) => {
		console.log(data)
		emit('saveCard', data)
	}

const addCard = () => {
	uiStore.showDialog({
		component: markRaw(getComponentDialog() as object),
		props: {
			adding: true,
			data: {}					
		},
		events: {
			cancelCard: () => uiStore.hideDialog(),
			saveCard: (evt: any) => emit('saveCard', evt)
		}
	})
}

</script>
<style lang="scss" scoped>
.title-container {
	text-align: center;
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
	margin-bottom: 50px; // salvar boton de añadir
}

.add-button {
	position: absolute;
	right: 15px;
	bottom: 20px;
}

</style>
