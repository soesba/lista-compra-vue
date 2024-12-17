<template>
  <div class="wrapper">
    <v-card v-for="precio in precios" :key="precio.id">
      <v-card-text>
        <div class="inputGroup">
          <div class="labelFor">Fecha de compra:</div>
          <div> {{ getFechaCompra(precio.fechaCompra) }} </div>
        </div>
        <div class="inputGroup">
          <div class="labelFor">Establecimiento:</div>
          <div> {{ precio.establecimiento?.nombre }} </div>
        </div>
        <div class="inputGroup">
          <div class="labelFor">Precio:</div>
          <div>{{  formatDecimal(precio.precio) }}</div>
        </div>
        <div class="inputGroup">
          <div class="labelFor">Cantidad:</div>
          <div v-for="medida in precio.unidadesMedida">
            {{ medida.valor }} {{ pluralize(medida.nombre, medida.valor) }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type Precio from '@/services/precio/models/Precio'
import { formatDecimal, pluralize } from '@/utils/utils'
export default defineComponent({
	name: 'HistoricoPrecios',
})
</script>
<script setup lang="ts">
defineProps({
	precios: {
		type: Array<Precio>,
		default: {},
	},
})

const getFechaCompra = (value: any) => {
	return value ? new Intl.DateTimeFormat('es-ES', {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(value) : ''
}
</script>
<style lang="scss" scoped>
  .v-card-text {
    font-size: inherit;
  }
	.wrapper {
		display: flex;
    flex-wrap: wrap;
    gap: 10px;
   .inputGroup {
      justify-content: space-between;
      align-items: center;
   }
	}
</style>
