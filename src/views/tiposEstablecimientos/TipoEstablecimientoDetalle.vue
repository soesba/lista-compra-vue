<template>
  <detail-toolbar
    @onBack="onBack"
    @onEdit="setEdicion"
    @onDelete="runDelete"
    :deleteDisabled="!canDelete"
    :editDisabled="!canEdit" />
  <div class="form">
    <TitleSection :titulo="data.nombre" :subtitulo="data.abreviatura" :aviso="avisoSeccion" />
    <div class="body">
      <div v-if="!data.esMaestro" class="inputGroup">
        <div class="labelFor">Protección contra borrado accidental</div>
        <div>{{ data.borrable ? 'No' : 'Sí' }}</div>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Nombre</div>
        <label>{{ data.nombre }}</label>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Abreviatura</div>
        <label>{{ data.abreviatura }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import router from '@/router'
  import TitleSection from '@/components/TitleSection.vue'
  import DetailToolbar from '@/components/DetailToolbar.vue'
  import deleteItem from '@/services/tipoEstablecimiento/deleteTipoEstablecimiento.service'
  import type TipoEstablecimiento from '@/services/tipoEstablecimiento/models/TipoEstablecimiento'
  import getTipoEstablecimientoById from '@/services/tipoEstablecimiento/getTipoEstablecimientoById.service'
  import { authStore, eventStore, modelStore } from '@/main'

  // Props
  defineProps({
    adding: {
      type: Boolean,
      default: false
    }
  })
  const route = useRoute()
  // Data
  const data: TipoEstablecimiento = (
    await getTipoEstablecimientoById(route.params['id'].toString())
  ).data as TipoEstablecimiento

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

  // Methods
  const setEdicion = () => {
    modelStore.tipoEstablecimiento = data
    router.push(eventStore.getRoutes.edit)
  }

  const runDelete = () => {
    if (canDelete) {
      deleteItem(data!.id).then(response => {
        if (response.respuesta === 200) {
          onBack()
        }
      })
    }
  }

  const onBack = () => {
    router.push(eventStore.getRoutes.list)
  }
</script>
<style lang="scss" scoped></style>
