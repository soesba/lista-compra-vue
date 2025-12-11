<template>
  <detail-toolbar
    @onBack="onBack"
    @onEdit="setEdicion"
    @onDelete="runDelete"
    :deleteDisabled="!canDelete"
    :editDisabled="!canEdit" />
  <div class="form">
    <div class="header">
      <v-img class="logo" :src="getImageSrc"></v-img>
      <label class="text-h6">{{ data.nombre }}</label>
    </div>
    <div class="body">
      <div class="inputGroup">
        <div class="labelFor">Protección contra borrado accidental</div>
        <div>{{ data.borrable ? 'Desactivado' : 'Activado' }}</div>
      </div>
      <div class="inputGroup">
        <label class="labelFor">Categoría</label>
        <label>{{ data.tipoEstablecimiento.nombre }}</label>
      </div>
      <div class="inputGroup">
        <label class="labelFor">Direcciones</label>
        <label v-if="!mostrarDirecciones"> No hay direcciones </label>
      </div>
      <div
        v-if="mostrarDirecciones"
        v-for="direcccion in data.direcciones"
        class="inputGroup indent">
        <label>{{ direcccion.direccion }}</label>
        <label>{{ direcccion.poblacion }}</label>
        <label>{{ direcccion.codPostal }}</label>
        <v-btn v-if="direcccion.favorita" icon="mdi-star" variant="text" color="primary"></v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import router from '@/router'
  import getById from '@/services/establecimiento/getEstablecimientoById.service'
  import { useRoute } from 'vue-router'
  import deleteItem from '@/services/establecimiento/deleteEstablecimiento.service'
  import DetailToolbar from '@/components/DetailToolbar.vue'
  import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
  import { authStore, noLogoUrl } from '@/main'
  import { eventStore, modelStore } from '@/main'

  // Props
  defineProps({
    // data: {
    //   type: Object as PropType<Establecimiento>,
    // 	default: modelStore.establecimiento
    // },
    adding: {
      type: Boolean,
      default: false
    }
  })
  const route = useRoute()
  // Data
  const data: Establecimiento = (await getById(route.params['id'].toString()))
    .data as Establecimiento
  // Computed
  const getImageSrc = computed(() => {
    return data.logo ? data.logo.content : noLogoUrl
  })
  const mostrarDirecciones = computed(() => {
    return data.direcciones.length !== 0
  })
  const canDelete = computed(() => {
    return data.borrable || authStore.usuario.esAdministrador
  })
  const canEdit = computed(() => {
    return data.borrable || authStore.usuario.esAdministrador
  })

  // Methods
  const onBack = () => {
    router.push(eventStore.getRoutes.list)
  }

  const setEdicion = () => {
    modelStore.establecimiento = data
    router.push(eventStore.getRoutes.edit)
  }

  const runDelete = (cardData: any) => {
    if (cardData.borrable) {
      deleteItem(cardData.id).then(response => {
        if (response.respuesta === 200) {
          router.push(eventStore.getRoutes.list)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    color: rgb(var(--v-theme-primary));
  }
  .logo {
    width: 150px;
  }
  .indent {
    margin-left: 20px;
  }
</style>
