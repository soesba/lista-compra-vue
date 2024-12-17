<template>
	<div v-for="eq in equivalencias" class="inputGroup">
		<label class="labelFor">Precio por {{ eq.to.nombre }}:</label> <label class="labelData">{{ formatDecimal(getPrecio(eq)) }}</label>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import getByFromMultiple from '@/services/equivalencia/getEquivalenciaByFromMultiple.service'
import type UnidadMedida from '@/services/precio/models/UnidadMedida'
import { formatDecimal } from '@/utils/utils'

export default defineComponent({
	name: 'PrecioEquivalenciaComponent',
})
</script>
<script setup lang="ts">
const props = defineProps({
	unidadesMedida: {
		type: Array<UnidadMedida>,
		default: '',
	},
	precio: {
		type: Number,
		default: 0,
	},
})

console.log(props.precio)

const equivalencias = ref()
getByFromMultiple(props.unidadesMedida.map((x) => x.id)).then((response) => {
	equivalencias.value = response.data
})

const getPrecio = (eq: any) => {
	console.log('LOG~ ~ file: PrecioEquivalenciaComponent.vue:37 ~ getPrecio ~ eq:', eq)
	const valor = props.unidadesMedida.find((x) => x.id === eq.from.id)
	if (valor) {
		return props.precio / (valor['valor'] * eq.factor)
	}
	return 0
}
</script>
<style lang="scss" scoped></style>
