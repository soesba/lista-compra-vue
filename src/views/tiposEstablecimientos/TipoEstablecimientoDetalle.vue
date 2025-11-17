<template>
  <detail-toolbar
    @onBack="onBack"
    @onEdit="setEdicion"
    @onDelete="runDelete"
    :deleteDisabled="!canDelete"
    :editDisabled="!canEdit" />
  <div class="form">
    <div class="body">
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
    return authStore.usuario.esAdministrador || data.borrable
  })
  const canEdit = computed(() => {
    return authStore.usuario.esAdministrador || data.borrable
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
