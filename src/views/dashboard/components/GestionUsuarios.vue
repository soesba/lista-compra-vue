<template>
  <div class="usuarios">
    <TitleView :titulo="title" :subtitulo="subtitle" :show-menu="false"></TitleView>
    <ResponsiveTable :cols-def="colDef" :row-data="usuarios" :options="tableOptions"></ResponsiveTable>
  </div>
</template>

<script setup lang="ts">
  import ResponsiveTable, { ColDef, TableOptions } from '@/components/responsiveTable/ResponsiveTable.vue'
  import TitleView from '@/components/TitleView.vue'
import { uiStore } from '@/main'
import deleteUsuario from '@/services/usuario/deleteUsuario.service'
  import get from '@/services/usuario/getUsuarios.service'
  import Usuario from '@/services/usuario/models/Usuario'
  import { computed, onMounted, ref, watch } from 'vue'
  import { VBtn } from 'vuetify/components/VBtn'

  const props = defineProps({
    reload: Boolean
  })
  const emmiter = defineEmits(['resetReload'])
  const title = 'Usuarios'
  const subtitle = 'Gestiona los usuarios de la aplicación'
  const usuarios = ref<Usuario[]>([])
  const tableOptions: TableOptions = {
    editable: false
  }
  const colDef = computed((): ColDef[] => [
    {
      field: 'esAdministrador',
      colType: 'html',
      valueGetter: ({ value }: any) => {
        return { html: value ? '<span class="mdi mdi-shield-account"></span>' : '' }
      }
    },
    { header: 'Usuario', field: 'username', colType: 'text' },
    { header: 'Nombre', field: 'nombre', colType: 'text' },
    {
      header: 'Primer apellido',
      dataTitulo: 'P. Apellido',
      field: 'primerApellido',
      colType: 'text'
    },
    {
      header: 'Segundo apellido',
      dataTitulo: 'S. Apellido',
      field: 'segundoApellido',
      colType: 'text'
    },
    { header: 'Email', field: 'email', colType: 'text' },
    { header: 'Rol', field: 'rol', colType: 'text', valueGetter: (params: any) => params.value?.nombre || '' },
    {
      header: 'Fecha creación',
      dataTitulo: 'F. Creación',
      field: 'fechaCreacion',
      colType: 'text'
    },
    {
      field: 'actions',
      header: 'Acciones',
      colType: 'actions',
      actions: [
        {
          component: VBtn,
          props: { icon: 'mdi-delete', variant: 'text' },
          action: (data: any) => {
            confirmDelete(data)
          }
        }
      ]
    }
  ])

  watch(
    () => props.reload,
    (newVal) => {
      if (newVal) {
        cargaUsuarios()
      }
    }
  )

  // const onEdit = (eventData: { data: any; rowIndex: number }) => {
  //   console.log('Editar usuario:', eventData)
  // }

  const confirmDelete = (eventData: { data: any; rowIndex: number }) => {
    uiStore.showActionDialog({
      props: {
        text: 'Si elimina el usuario, se eliminarán todos sus registros relacionados.\n ¿Desea continuar?',
        title: 'Confirmación'
      },
      aceptarFn: () => onDelete(eventData)
    })
  }

  const onDelete = (eventData: any) => {
    // TODO
    console.log('Eliminar usuario no implementado:', eventData)
    deleteUsuario(eventData.id).then(() => {
      cargaUsuarios()
    }).catch((error) => {
      console.error('Error al eliminar el usuario:', error)
    })
  }

  const cargaUsuarios = () => {
    get().then(response => {
      usuarios.value = response.data as Usuario[]
    })
    .catch(error => {
      console.error('Error al cargar los usuarios:', error)
    })
    if (props.reload) {
      emmiter('resetReload')
    }
  }

  onMounted(() => {
    cargaUsuarios()
  })
</script>

<style lang="scss" scoped>
  :deep(.mdi::before) {
    color: rgb(var(--v-theme-primary));
    font-size: 20px;
    vertical-align: middle;
  }
</style>
