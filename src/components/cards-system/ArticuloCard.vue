<template>
	<v-card class="cursor">
		<v-card-title>
			<div @click="detalleCard()">
				{{ cardData.nombre }}
			</div>
			<v-icon icon="mdi-pencil-circle" color="primary" @click="editCard()"></v-icon>
		</v-card-title>
		<v-card-text @click="detalleCard()">{{ cardData.descripcion }}
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import { uiStore } from '@/main'
	import { defineComponent } from 'vue'
import router from '@/router'
	export default defineComponent({
		name: 'ArticuloCard',
	})
</script>
<script setup lang="ts">
	import ArticuloCardDialog from './ArticuloCardDialog.vue'
	import type Articulo from '@/services/articulo/models/Articulo'
	import type { PropType } from 'vue'
	import { computed, ref, markRaw } from 'vue'

	// Props
	const props = defineProps({
		cardData: {
			type: Object as PropType<Articulo>,
			default() {
				return {}
			},
		},
	})
	// Data
	let data = ref(props.cardData)
	// Computed
	const canDelete = computed(() => {
		return props.cardData.borrable
	})
	// Methods
	const editCard = () => {
		uiStore.showCustomDialog({
			component: markRaw(ArticuloCardDialog),
			props: {
				data: data					
			}
		})
	}
	const detalleCard = () => {
		router.push(`/articulo-detalle/${data.value.id}`)
	}
</script>
<style lang="scss" scoped>
	.v-card {
		margin: 10px;
		.v-card-title {
			display: flex;
			flex-direction: row;
			div:first-of-type {
				flex: 2;
			}
		}

		.wrapper-icons {
			display: flex;
			flex-direction: column;
		}
	}
</style>
