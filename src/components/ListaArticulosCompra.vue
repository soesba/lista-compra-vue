<template>
	<div id="wrapper-list">  
    <div class="title">
      <div>Descripción</div>
      <div>P. unit</div>
      <div>Cantidad</div>
      <div>Importe</div>
    </div>
    <div class="rows" v-for="articulo in articulos">
      <div class="cells">
        <div>{{ articulo.articulo.nombre }}</div>
        <div>{{ articulo.precioUnitario }}</div>
        <div>{{ articulo.cantidad }}</div>
        <div>{{ getTotal(articulo) }}</div>
      </div>
      <div v-for="tipoUnidad in articulo.unidadesMedida" class="cells">
        {{ tipoUnidad.nombre }} {{ tipoUnidad.valor }}
      </div>
    </div>
	</div>
</template>
<script lang="ts">
	import useVuelidate from '@vuelidate/core'
	import { required } from 'vuelidate/lib/validators'
	import type { PropType } from 'vue'
	import { computed, defineComponent, ref } from 'vue'
  import get from '@/services/articulo/getArticulo.service'
  import type ArticuloCompra from '@/services/precio/models/ArticuloCompra'
	export default defineComponent({
		name: 'ListaArticulosCompra',
	})
</script>
<script setup lang="ts">
	const emitter = defineEmits(['saveArticulo', 'updateArticulo'])
	const props = defineProps({
		articulos: {
			type: Array<ArticuloCompra>,
			default: [],
		},
	})

	// Methods	
  const getTotal = (value: any): number => {
    if (value.cantidad && value.precioUnitario) {
      return value.cantidad * value.precioUnitario
    }
    return 0
  }

</script>
<style lang="scss" scoped>
	#wrapper-list {
		display: flex;
    flex-direction: column;
		justify-content: center;    
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .rows {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cells {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
	}

</style>
