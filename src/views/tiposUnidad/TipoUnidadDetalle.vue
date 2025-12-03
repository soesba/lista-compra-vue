<template>
  <detail-toolbar
    @onBack="onBack"
    @onEdit="setEdicion"
    @onDelete="runDelete"
    :deleteDisabled="!canDelete"
    :editDisabled="!canEdit" />
  <div class="form" v-if="data">
    <TitleSection :titulo="data.nombre" :subtitulo="data.abreviatura" :aviso="avisoSeccion" />
    <div class="body">
      <div v-if="!data.esMaestro" class="inputGroup">
        <div class="labelFor">Protección contra borrado accidental</div>
        <div>{{ data.borrable ? 'Desactivado' : 'Activado' }}</div>
      </div>
      <div class="inputGroup">
        <label class="labelFor">Equivalencias</label>
      </div>
      <div v-if="data.equivalencias?.length === 0" class="inputGroup">
        <label> No hay equivalencias </label>
      </div>
      <div v-else class="inputGroup margin-top-bottom">
        <label>1 {{ data.nombre }} equivale a </label>
      </div>
      <div v-for="equivalencia in data.equivalencias">
        <label
          >{{ equivalencia.factor }}
          {{ pluralize(equivalencia.to.nombre, equivalencia.factor) }}</label
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import router from '@/router'
  import DetailToolbar from '@/components/DetailToolbar.vue'
  import TitleSection from '@/components/TitleSection.vue'
  import { authStore, eventStore, modelStore } from '@/main'
  import { useRoute } from 'vue-router'
  import getById from '@/services/tipoUnidad/getTipoUnidadById.service'
  import deleteItem from '@/services/tipoUnidad/deleteTipoUnidad.service'
  import TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
  import { pluralize } from '@/utils/utils'
  // Computed
  const canDelete = computed(() => {
    return !data.esMaestro || authStore.usuario.esAdministrador
  })
  const canEdit = computed(() => {
    return !data.esMaestro || authStore.usuario.esAdministrador
  })
  const avisoSeccion = computed(() => {
    if (data.esMaestro) {
      if (authStore.usuario.esAdministrador) {
        return 'Este es un dato maestro. Cualquier modificación o eliminación afectará a todos los usuarios.'
      } else {
        return 'Este es un dato maestro. Solo puede ser eliminado o modificado por un administrador.'
      }
    }
    return ''
  })
  // Data
  const route = useRoute()
  const data: TipoUnidad = (await getById(route.params['id'].toString())).data as TipoUnidad

  const setEdicion = () => {
    modelStore.setTipoUnidad(data)
    router.push(eventStore.getRoutes.edit)
  }

  const runDelete = () => {
    if (data.borrable) {
      deleteItem(data.id).then((response: any) => {
        if (response.respuesta === 200) {
          router.push(eventStore.getRoutes.list)
        }
      })
    }
  }

  const onBack = () => {
    router.push(eventStore.getRoutes.list)
  }
</script>
<style lang="scss" scoped></style>
