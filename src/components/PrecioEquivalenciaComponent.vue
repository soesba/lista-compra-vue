<template>
	<div v-for="eq in equivalencias" class="inputGroup">
		<label class="labelFor">Precio por {{ eq.to.nombre }}:</label> <label class="labelData">{{ formatCurrency(getPrecio(eq)) }}</label>
    <div v-html="getBloquePrecioUnidad()"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import getByFromMultiple from '@/services/equivalencia/getEquivalenciaByFromMultiple.service'
import type UnidadMedida from '@/services/precio/models/UnidadMedida'
import { formatCurrency } from '@/utils/utils'
import Equivalencia from '@/services/equivalencia/models/Equivalencia';

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

console.log(props)

let equivalencias = reactive(await (await getByFromMultiple(props.unidadesMedida.map((x) => x.id))).data) as Equivalencia[]
console.log('LOG~ ~ :33 ~ equivalencias:', equivalencias)

const getPrecio = (eq: any) => {
	console.log('LOG~ ~ file: PrecioEquivalenciaComponent.vue:37 ~ getPrecio ~ eq:', eq)
	const valor = props.unidadesMedida.find((x) => x.id === eq.from.id)
	if (valor) {
		return props.precio / (valor['valor'] * eq.factor)
	}
	return 0
}

const getBloquePrecioUnidad = () => {
  const unidad = props.unidadesMedida.find((x) => x.nombre.includes('unidad'))
  if (unidad) {
    return `<label class="labelFor">Precio por unidad:</label> <label class="labelData">${formatCurrency(props.precio / unidad.valor)}</label>`
  } else {
    return null
  }
}
</script>
<style lang="scss" scoped></style>
