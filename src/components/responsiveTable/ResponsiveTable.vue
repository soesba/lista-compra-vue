<template>
  <div class="wrapper">
    <table name="responsive-table" :color="options.color">
      <thead>
        <tr>
          <th v-for="col in colsDef" :key="col.field" :class="{ 'action-column': col.field === 'actions' }">
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowData" :key="row.id">
          <td
            :data-titulo="col.field !== 'actions' ? col.dataTitulo || col.header : null"
            v-for="col in colsDef"
            :key="col.field"
            :class="{ 'action-column': col.field === 'actions' }">
            <slot name="body">
              <div v-if="col.colType === 'html'" v-html="getValue(row, col)"></div>
              <span v-else-if="col.colType !== 'actions'">{{ getValue(row, col) }}</span>
              <span v-else>
                <component
                  :is="action.component"
                  v-for="(action, index) in col.actions"
                  v-bind="action.props"
                  :color="action.props.color || options.color"
                  :key="index"
                  @click="action.action(row)" />
              </span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
  // Interface que define los eventos
  export interface responsiveTableEvent {
    rowData: any
    rowIndex: number
  }

  // Posibles tipos de datos a mostrar en cada columna
  type colType = 'number' | 'text' | 'date' | 'boolean' | 'html' | 'actions'

  // Posibles tipos de edición, por ahora solo custom
  type editType = 'custom' | 'singleCell' | 'fullRow'

  export interface ValueGetterFunction {
    (params: ValueGetterParams): any
  }

  interface ValueGetterParams {
    // A utility method for getting other column values
    value: any
    // Datos de la fila
    data: Array<any>
    // Column for this callback
    indexCol: number
    // ColDef provided for this column
    colDef: ColDef
  }
  // Interface que define las opciones de la tabla
  export interface TableOptions {
    // Color de la tabla (primary or secondary)
    color?: string
    // Especifica si la tabla es editable
    editable?: Boolean
    // Especifica el modo de edición de la tabla
    editType?: editType
  }
  // Interface que define las propiedades de cada uno de los componentes dentro de la columna de Acciones.
  interface ActionColDef {
    // Componente a renderizar
    component: Component
    // Propiedades del componente
    props: Record<string, any>
    // Acción a ejecutar al pulsar sobre el componente
    action: (rowData: any) => void
  }
  // Interface que define las propiedades de las columnas de datos
  export interface ColDef {
    // nombre del campo
    field: string
    // texto de la cabecera
    header?: string
    // titulos a mostrar en modo card
    dataTitulo?: string
    // tipo de dato
    colType: colType
    // función para mapear valores en caso de querer mostrar algo diferente de lo que viene en field
    valueGetter?: ValueGetterFunction
    // habilita / deshabilita ordenación
    sortable?: boolean
    // contenido de la columna de acciones (solo aplicable si colType === 'actions')
    actions?: Array<ActionColDef>
  }

  import { type Component, onMounted, PropType } from 'vue'

  const props = defineProps({
    // Datos de las filas
    rowData: {
      type: Array<any>,
      required: true
    },
    // Definición de las columnas
    colsDef: {
      type: Array as () => Array<ColDef>,
      default: () => []
    },
    options: {
      type: Object as PropType<TableOptions>,
      default: (rawProps: any) => ({
        color: 'primary',
        actionColumns: true,
        editable: true,
        ...rawProps
      })
    }
  })

  const defaultTableOptions: TableOptions = {
    color: 'primary',
    editable: true,
    editType: 'custom'
  }
  const options = { ...defaultTableOptions, ...props.options }
  const getValue = (rowData: any, col: ColDef) => {
    const params: ValueGetterParams = {
      value: rowData[col.field],
      data: rowData,
      indexCol: props.colsDef.indexOf(col),
      colDef: col
    }
    if (col.colType === 'html') {
      return col.valueGetter!(params).html
    } else if (col.colType === 'date') {
      return col.valueGetter ? col.valueGetter!(params) : params.value ? new Date(params.value) : ''
    } else if (col.colType === 'boolean') {
      return col.valueGetter ? col.valueGetter!(params) : params.value ? 'Sí' : 'No'
    }
    return col.valueGetter ? col.valueGetter!(params) : params.value
  }

  onMounted(() => {
    setTimeout(() => {
      // setActionColumnWidth()
    }, 500)
  })

  // Ajuste del ancho de la columna de acciones al contenido
  const setActionColumnWidth = () => {
    const rootEl = document.getElementsByName('responsive-table')[0]
    if (rootEl) {
      const actionColumn = rootEl.querySelectorAll('.action-column')
      const buttonsWidth: number = actionColumn[1]
        ? (Array.from(actionColumn[1].querySelectorAll('button')).reduce(
            (acc: any, button: any) => acc + (button as HTMLElement).offsetWidth,
            0
          ) as number)
        : 0
      if (actionColumn) {
        actionColumn.forEach(actionCol => {
          ;(actionCol as HTMLElement).style.width = `${buttonsWidth + 40}px`
        })
      }
    }
  }
</script>
<style lang="scss" scoped src="./responsiveTable.scss"></style>
