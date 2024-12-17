<template>
	<v-card class="cursor" @click="editCard()">
		<v-img class="logo" :src="getImageSrc"></v-img>
		<v-card-title>{{ cardData.nombre }}</v-card-title>
		<v-card-subtitle>{{ cardData.tipoEstablecimiento.nombre }}</v-card-subtitle>
		<v-card-text class="text-small">Creado: {{ cardData.fechaCreacion }}</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { noLogoUrl } from '@/main'
import { defineComponent } from 'vue'
import router from '@/router'
export default defineComponent({
	name: 'EstablecimientoCard',
})
</script>
<script setup lang="ts">
import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
	
// Props
const props = defineProps({
	cardData: {
		type: Object as PropType<Establecimiento>,
		default() {
			return {}
		}
	},
})	
// Data
const data = ref(props.cardData)
// Computed
const getImageSrc = computed(() => {
	return props.cardData.logo ? props.cardData.logo.content : noLogoUrl
})
const canDelete = computed(() => {
	return props.cardData.borrable
})
// Methods
const editCard = () => {
	router.push(`/establecimiento-detalle/${data.value.id}`)
}
</script>
<style lang="scss" scoped>
.v-card {
	margin: 10px;
}

.logo {
	width: 150px;
	height: auto;
}
</style>
