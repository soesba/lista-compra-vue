<template>
  <div v-for="eq in equivalencias" class="inputGroup">
    <label>Precio por {{ eq.to.nombre }}: {{ formatDecimal(getPrecio(eq)) }}</label>
  </div>
</template>
<script lang="ts">
	import { defineComponent, ref } from 'vue'
import getByFromMultiple from '@/services/equivalencia/getEquivalenciaByFromMultiple.service';
import type UnidadMedida from '@/services/precio/models/UnidadMedida';
import { debug } from 'console';
import { formatDecimal } from '@/utils/utils';

	export default defineComponent({
		name: 'PrecioEquivalenciaComponent',
	})
</script>
<script setup lang="ts">
	const props = defineProps({
		unidadesMedida: {
      type: Array<UnidadMedida>,
      default: ''
    },
    precio: {
      type: Number,
      default: 0
    }
	})

  console.log(props.precio)

  const equivalencias = ref()
  getByFromMultiple(props.unidadesMedida.map(x => x.id)).then(response => {
    equivalencias.value = response.data
  })

  const getPrecio = (eq) => {
    const valor = props.unidadesMedida.find(x => x.id === eq.from.id) || 0
    return props.precio / (valor['valor'] * eq.factor)
  }

</script>
<style lang="scss" scoped>
</style>
