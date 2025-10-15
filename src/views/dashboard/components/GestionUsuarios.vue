<template>
  <div class="usuarios">
    <v-card>
      <v-card-title>{{ header }}</v-card-title>
      <v-card-text>
        {{ subtitle }}
      </v-card-text>
    </v-card>
    <ResponsiveTable
      :cols-def="colDef"
      :row-data="usuarios"
      :options="tableOptions"
    ></ResponsiveTable>
  </div>
</template>

<script setup lang="ts">
import ResponsiveTable, { ColDef, TableOptions } from '@/components/responsiveTable/ResponsiveTable.vue';
import get from '@/services/usuario/getUsuarios.service';
import Usuario from '@/services/usuario/models/Usuario';
import { onMounted, ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn'



const header = 'Usuarios'
const subtitle = 'Gestiona los usuarios de la aplicación'
const usuarios = ref<Usuario[]>([])
const tableOptions: TableOptions = {
  editable: false
}
const colDef: ColDef[] = [
  { header: '    ', field: 'esAdministrador', colType: 'html', valueGetter: ({ value }: any) => {
    console.log('LOG~ ~ :34 ~ value:', value)
      return { html: value ? '<span class="mdi mdi-shield-account"></span>' : '' }
    }
  },
  { header: 'Usuario', field: 'username', colType: 'text' },
  { header: 'Nombre', field: 'nombre', colType: 'text' },
  { header: 'Primer apellido', dataTitulo: 'P. Apellido', field: 'primerApellido', colType: 'text' },
  { header: 'Segundo apellido', dataTitulo: 'S. Apellido', field: 'segundoApellido', colType: 'text' },
  { header: 'Email', field: 'email', colType: 'text' },
  { header: 'Fecha creación', dataTitulo: 'F. Creación', field: 'fechaCreacion', colType: 'text' },
  {
    field: 'actions',
    header: 'Acciones',
    colType: 'actions',
    actions: [
      {
        component: VBtn,
        props: { icon: 'mdi-delete', variant: 'text' },
        action: (data: any) => {
          onDelete(data)
        }
      }
    ]
  }
]

const onEdit = (eventData: { data: any; rowIndex: number }) => {
  console.log('Editar usuario:', eventData)
}

const onDelete = (eventData: { data: any; rowIndex: number }) => {
  console.log('Eliminar usuario:', eventData)
}

onMounted(() => {
  console.log('Mounted GestionUsuarios')
  get().then(response => {
    usuarios.value = response.data as Usuario[]
  }).catch(error => {
    console.error('Error al cargar los usuarios:', error)
  })
})
</script>

<style lang="scss" scoped>
  :deep(.mdi::before) {
    color: rgb(var(--v-theme-primary));
    font-size: 20px;
    vertical-align: middle;
  }
</style>
