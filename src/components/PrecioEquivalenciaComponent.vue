<template>
	<div v-for="eq in equivalencias" class="inputGroup">
		<label class="labelFor">Precio por {{ eq.to.nombre }}:</label> <label class="labelData">{{ formatCurrency(getPrecio(eq)) }}</label>
    <div v-html="getBloquePrecioUnidad()"></div>
	</div>
</template>

<script setup lang="ts">
import type UnidadMedida from '@/services/precio/models/UnidadMedida'
import { formatCurrency } from '@/utils/utils'
import getEquivalencias from '@/services/tipoUnidad/getEquivalencias.service';
import { onMounted, ref } from 'vue';
import Equivalencia from '@/services/equivalencia/models/Equivalencia';

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

const equivalencias = ref()

onMounted(async () => {
  equivalencias.value = await loadEquivalencias()
})

const loadEquivalencias = async (): Promise<Equivalencia[]> => {
  let resultado: any = []
  for (const unidad of props.unidadesMedida) {
    const result = (await getEquivalencias(unidad.id)).data as any[]
    for (const item of result) {
      resultado.push( {
        ...item,
        from: { ...unidad}
      })
    }
  }
  return resultado
}

const getPrecio = (eq: any) => {
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
