<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Fecha de compra</th>
          <th>Establecimiento</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th v-if="editable"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="precio in precios" :key="precio.id">
          <td data-titulo="Fecha compra">{{ getFechaCompra(precio.fechaCompra) }}</td>
          <td data-titulo="Establecimiento">{{ precio.establecimiento?.nombre }}</td>
          <td data-titulo="Precio">{{ formatCurrency(precio.precio) }}</td>
          <td data-titulo="Cantidad">
            <div class="cantidad-container">
              <div v-for="medida in precio.unidadesMedida" :key="medida.id">
                {{ medida.valor }} {{ pluralize(medida.nombre, medida.valor) }}
              </div>
            </div>
          </td>
          <td v-if="editable">
            <v-btn icon="mdi-pencil" variant="text" color="primary" @click="onClickEdit(precio)"></v-btn>
            <v-btn icon="mdi-delete" variant="text" color="primary" @click="onClickDelete(precio)"></v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type Precio from '@/services/precio/models/Precio'
import { formatCurrency, pluralize } from '@/utils/utils'
import router from '@/router';
import { modelStore } from '@/main';
export default defineComponent({
	name: 'HistoricoPrecios',
})
</script>
<script setup lang="ts">
defineProps({
  editable: {
    type: Boolean,
    default: false
  },
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

const onClickEdit = (precio: Precio) => {
  modelStore.setPrecio(precio)
  router.push('/precio-edicion')
}

const onClickDelete = (precio: Precio) => {
  console.log('LOG~ ~ :68 ~ onClickDelete ~ precio:', precio)
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
  table {
    width: 100%;
    border-collapse: none;
    th, td {
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  }
@media (max-width: 30em) { /* 30 x 16px = 480px */
  table {
    width: 100%;
    border-collapse: none;
    td {
      padding: 0.3em 1em;
    }
  }
  table thead {
    display: none;
  }
  table tr {
    display: flex;
    flex-direction: column;
    margin: 0.5em 0;
    margin-bottom: 1em;
    border-radius: 4px;
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
  }
  table td[data-titulo] {
    display: flex;
    justify-content: space-between;
    // padding: 0.3em 1em;
  }
  table td:not([data-titulo]) {
    display: flex;
    justify-content: center;
    // padding: 0.3em 1em;
  }
  table td[data-titulo]::before {
    content: attr(data-titulo) ":";
    font-size: 0.8rem;
    font-weight: 500;
  }
}
</style>
