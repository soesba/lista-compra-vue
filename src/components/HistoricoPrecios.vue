<template>
  <div class="historico-precios-wrapper" :class="{ 'editing': editable }">
    <ResponsiveTable
      :cols-def="colDef"
      :row-data="precios"
      :options="tableOptions">
    </ResponsiveTable>
    <div v-if="editable" class="wrapper-add-button">
      <v-fab
        icon="mdi-plus"
        class="ms-4"
        location="bottom end"
        absolute
        offset
        color="primary"
        @click="onClickInsert()"></v-fab>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
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
    editable: props.editable,
  }

  const colDef = computed((): ColDef[] => {
    return props.editable ? colDefBase.value : colDefBase.value.filter(col => col.colType !== 'actions')
  })

  const colDefBase = computed((): ColDef[] => [
    {
      field: 'fechaCompra',
      header: 'Fecha compra',
      width: 150,
      colType: 'text',
      valueGetter: ({ value }: any) => getFechaCompra(value)
    },
    {
      field: 'establecimiento',
      header: 'Establecimiento',
      colType: 'html',
      width: 150,
      alignment: 'center',
      valueGetter: ({ value }: any) => {
        return value.logo.content ?
          { html: `<div class="logo">
                    <img src="${value.logo.content}" class="logo" />
                  </div>` }
          : { html: `<span>${value.nombre}</span>` }
      }
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
    { field: 'notas', header: 'Notas', colType: 'text' },
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
  :deep(.logo) {
    width: 50px;
    gap: 10px;
    justify-self: center;
  }

  .wrapper {
    justify-content: center;
  }
  .historico-precios-wrapper {
    &.editing {
      margin-bottom: 60px; // salvar boton de añadir
    }
    .wrapper-add-button {
      position: fixed;
      width: 100%;
      bottom: 40px;
      right: 20px;
    }
  }

</style>
