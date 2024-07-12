<template>
	<div class="list-container">
		<component :is="getComponent()" v-for="item in items" :key="item.id" :cardData="item"/>		
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TipoUnidadCard from './TipoUnidadCard.vue';
export default defineComponent({
	name: 'CardList'
})
</script>
<script setup lang="ts">
import type TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
const props = defineProps({
	items: Array<TipoUnidad>,
	component: String
})
const getComponent = () => {
	switch(props.component) {
		case 'TipoUnidadCard':
			return TipoUnidadCard
	}
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
	justify-content: center;
	flex-wrap: wrap;
}
</style>
