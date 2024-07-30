<template>
  <div class="wrapper">
    <v-card v-for="precio in precios" :key="precio.id" class="text-caption">
      <v-card-text>
        <div class="inputGroup">
          <div>F. compra:</div>
          <div> {{ getFechaCompra(precio.fechaCompra) }} </div>
        </div>
        <div class="inputGroup">
          <div>Establecimiento:</div>
          <div> {{ precio.establecimiento?.nombre }} </div>
        </div>
        <div class="inputGroup">
          <div>Precio:</div>
          <div>{{  getPrecio(precio.precio) }}</div>
        </div>
        <div class="inputGroup">
          <div>Cantidad:</div>
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
  import { pluralize } from '@/utils/utils'
	export default defineComponent({
		name: 'HistoricoPrecios',
	})
</script>
<script setup lang="ts">
	const emitter = defineEmits(['saveArticulo', 'updateArticulo'])
	const props = defineProps({
		precios: {
			type: Array<Precio>,
			default: {},
		},
	})

  const getPrecio = (value) => {
		return value ? value.toFixed(2).concat(' €') : null
	}

  const getFechaCompra = (value) => {
		return value ? new Intl.DateTimeFormat('es-ES', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value) : ''
	}
</script>
<style lang="scss" scoped>
  .v-card-text {
    font-size: 0.75rem !important;
    font-weight: 400;
    line-height: 1.667;
    letter-spacing: 0.0333333333em !important;
    font-family: "Roboto", sans-serif;
    text-transform: none !important;
  }
	.wrapper {
		display: flex;
    flex-wrap: wrap;
    gap: 10px;
   .inputGroup {
    justify-content: space-between;
   }
	}
</style>
