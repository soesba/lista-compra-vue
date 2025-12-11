<template>
  <detail-toolbar @onBack="onBack" @onEdit="setEdicion" @onDelete="runDelete"> </detail-toolbar>
  <div class="form">
    <TitleSection :titulo="data.articulo.nombre" :subtitulo="data.marca" />
    <div v-if="data.precio" class="body">
      <div class="inputGroup">
        <div class="labelFor">Protección contra borrado accidental</div>
        <div>{{ data.borrable ? 'Desactivado' : 'Activado' }}</div>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Establecimiento</div>
        <label>{{ data.establecimiento?.nombre }}</label>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Medidas:</div>
        <div class="labelData" v-for="tipoUnidad in data.unidadesMedida">
          {{ formatCurrency(tipoUnidad.valor, false) }} {{ pluralize(tipoUnidad.nombre, tipoUnidad.valor) }}
        </div>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Precio:</div>
        <label>{{ formatCurrency(data.precio) }}</label>
      </div>
      <PrecioEquivalenciaComponent :unidades-medida="data.unidadesMedida" :precio="data.precio" />
    </div>
    <div v-else class="body">No hay precios introducidos</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router'
  import getPrecioById from '@/services/precio/getPrecioById.service'
  import { useRoute } from 'vue-router'
  import { formatCurrency, pluralize } from '@/utils/utils'
  import PrecioEquivalenciaComponent from '@/components/PrecioEquivalenciaComponent.vue'
  import { eventStore, modelStore } from '@/main'
  import deleteItem from '@/services/precio/deletePrecio.service'
  import DetailToolbar from '@/components/DetailToolbar.vue'
  import type Precio from '@/services/precio/models/Precio'
  import TitleSection from '@/components/TitleSection.vue'

  // Props
  defineProps({
    adding: {
      type: Boolean,
      default: false
    }
  })
  const route = useRoute()
  // Data
  const data = ref((await getPrecioById(route.params['id'].toString())).data as Precio)

  // Methods
  const onBack = () => {
    router.push(eventStore.getRoutes.list)
  }

  const setEdicion = () => {
    modelStore.setPrecio(data.value)
    router.push(eventStore.getRoutes.edit)
  }

  const runDelete = (cardData: any) => {
    if (cardData.borrable) {
      deleteItem(cardData.id).then(response => {
        if (response.respuesta === 200) {
          console.log('🚀 ~ deleteItem ~ response:', response)
          onBack()
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .logo {
    width: 150px;
  }
  .indent {
    margin-left: 20px;
  }
</style>
