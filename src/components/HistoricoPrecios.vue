<template>
  <v-btn
    v-if="editable"
    class="mb-4"
    color="primary"
    @click="onClickInsert">
      Insertar precio
  </v-btn>
  <ResponsiveTable
    :cols-def="colDef"
    :row-data="precios"
    :options="tableOptions">
  </ResponsiveTable>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import type Precio from '@/services/precio/models/Precio'
  import { dateToFront, formatCurrency, pluralize } from '@/utils/utils'
  import router from '@/router'
  import { modelStore } from '@/main'
  import ResponsiveTable, { ColDef, TableOptions } from './responsiveTable/ResponsiveTable.vue'
  import { VBtn } from 'vuetify/components/VBtn'
  import Articulo from '@/services/articulo/models/Articulo'

  const props = defineProps({
    editable: {
      type: Boolean,
      default: false
    },
    precios: {
      type: Array as () => Precio[],
      default: () => []
    },
    articulo: {
      type: Object as () => Articulo,
      default: null
    }
  })

  const tableOptions: TableOptions = {
    editable: props.editable
  }

  const colDef = computed((): ColDef[] => {
    return props.editable ? colDefBase.value : colDefBase.value.filter(col => col.field !== 'actions')
  })

  const colDefBase = computed((): ColDef[] => [
    {
      field: 'fechaCompra',
      header: 'Fecha compra',
      colType: 'text',
      valueGetter: ({ value }: any) => getFechaCompra(value)
    },
    {
      field: 'establecimiento',
      header: 'Establecimiento',
      colType: 'text',
      valueGetter: ({ value }: any) => value.nombre
    },
    { field: 'precio', header: 'Precio', colType: 'number', valueGetter: ({ value }: any) => formatCurrency(value) },
    {
      field: 'unidadesMedida',
      header: 'Cantidad',
      colType: 'html',
      valueGetter: ({ value }: any) => {
        let html = '<div class="cantidad-container">'
        value.forEach((medida: any) => {
          html += `<div>${formatCurrency(medida.valor, false)} ${pluralize(medida.nombre, medida.valor)}</div>`
        })
        html += '</div>'
        return { html }
      }
    },
    {
      field: 'unidadesMedida',
      header: 'Precio ud ref.',
      colType: 'html',
      valueGetter: (params: any) => {
        const { value, data } = params
        let html = ''
        value.forEach((medida: any) => {
          const precio = getPrecioEquivalencias.value(medida, data.precio)
          html += `<div>${precio}</div>`
        })
        return { html }
      }
    },
    {
      field: 'actions',
      header: 'Acciones',
      colType: 'actions',
      actions: [
        {
          component: VBtn,
          props: { icon: 'mdi-pencil', variant: 'text' },
          action: (data: any) => {
            onClickEdit(data)
          }
        },
        {
          component: VBtn,
          props: { icon: 'mdi-delete', variant: 'text' },
          action: (data: any) => {
            onClickDelete(data)
          }
        }
      ]
    }
  ])

  const getPrecioEquivalencias = computed(() => {
    return (medida: any, precio: any) => {
      console.log('LOG~ ~ :102 ~ acceso a equivalencias')
      const equivalencia = medida.equivalencias ? medida.equivalencias[0] : null
      if (equivalencia) {
        return `${formatCurrency(precio / (medida.valor * equivalencia.factor))} ${pluralize(equivalencia.to.nombre, medida.valor * equivalencia.factor)}`
      }
      return ''
    }
  })

  const getFechaCompra = (value: any) => {
    return dateToFront(value)
  }

  const onClickInsert = () => {
    const nuevoPrecio: Precio = {
      id: '',
      precio: 0,
      marca: '',
      articulo: props.articulo,
      establecimiento: null,
      unidadesMedida: props.articulo
        ? props.articulo.tiposUnidad.map(item => {
            return { ...item, valor: 0 }
          })
        : [],
      fechaCompra: null,
      fechaCreacion: '',
      notas: '',
      borrable: true
    }
    modelStore.setPrecio(nuevoPrecio)
    router.push('/precio-edicion')
  }

  const onClickEdit = (precio: Precio) => {
    modelStore.setPrecio(precio)
    router.push('/precio-edicion')
  }

  const onClickDelete = (precio: Precio) => {
    // TODO
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
    border-collapse: collapse;
    th,
    td {
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  }
  @media (max-width: 30em) {
    /* 30 x 16px = 480px */
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
      box-shadow:
        0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
        0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
        0px 1px 3px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
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
      content: attr(data-titulo) ':';
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
</style>
