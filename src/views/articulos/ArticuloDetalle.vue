<template>
  <detail-toolbar @onBack="onBack" @onEdit="setEdicion" @onDelete="runDelete" />
  <div class="form">
    <TitleSection :titulo="data.nombre" :subtitulo="data.descripcion" />
    <div class="body">
      <div class="inputGroup">
        <div class="labelFor">Protección contra borrado accidental</div>
        <div>{{ data.borrable ? 'No' : 'Sí' }}</div>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Unidades de medida:</div>
        <div v-for="tipoUnidad in data.tiposUnidad">{{ tipoUnidad.nombre }}</div>
      </div>
      <div class="inputGroup" v-if="data.notas">
        <div class="labelFor">Notas</div>
        <label>{{ data.notas }}</label>
      </div>
      <div>
        <div class="inputGroup">
          <label class="labelFor">Histórico de precios</label>
        </div>
        <!-- <v-btn variant="text" color="primary" @click="introducirPrecio()">Introducir precio de compra</v-btn> -->
        <HistoricoPrecios v-if="data.precios" :precios="data.precios"></HistoricoPrecios>
        <div v-else class="inputGroup">
          <label>No hay precios registrados</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import getArticuloById from '@/services/articulo/getArticuloById.service'
  import { useRoute } from 'vue-router'
  import router from '@/router'
  import DetailToolbar from '@/components/DetailToolbar.vue'
  import { eventStore, modelStore } from '@/main'
  import type Articulo from '@/services/articulo/models/Articulo'
  import type Precio from '@/services/precio/models/Precio'
  import getByArticuloId from '@/services/precio/getPreciosByArticuloId.service'
  import deleteItem from '@/services/articulo/deleteArticulo.service'
  import { sort } from '@/utils/utils'
  import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
  import TitleSection from '@/components/TitleSection.vue'
  import getEquivalencias from '@/services/tipoUnidad/getEquivalencias.service'
  import Equivalencia from '@/services/equivalencia/models/Equivalencia'
  import { onMounted, ref } from 'vue'
import getLogo from '@/services/establecimiento/getLogo.service'

  // Props
  defineProps({
    adding: {
      type: Boolean,
      default: false
    }
  })
  const route = useRoute()
  const data = ref((await getArticuloById(route.params['id'].toString())).data as Articulo)

  onMounted(async() => {
    const precios = ((await getByArticuloId(data.value.id)).data as Precio[]).sort(sort('fechaCompra'))
    let logos: any[] = []
    for (const precio of precios) {
      let logo = logos.find((logo: any) => logo.establecimientoId === precio.establecimiento!.id)
      if (!logo) {
        logo = { logo: (await getLogo(precio.establecimiento!.id)).data, establecimientoId: precio.establecimiento!.id }
        logos.push(logo)
      }
      precio.establecimiento!.logo = logo.logo
      for (const um of precio.unidadesMedida) {
        const equivalencias = await getEquivalencias(um.id)
        um.equivalencias = []
        um.equivalencias?.push( ...(equivalencias.data as Equivalencia[]))
      }
    }
    data.value.precios = precios
  })

  // Data
  // Methods
  const onBack = () => {
    router.push(eventStore.getRoutes.list)
  }

  const setEdicion = () => {
    modelStore.articulo = data.value
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

  .tabla-historico {
    width: 100%;
    margin-left: 1%;
    margin-right: 1%;
    text-align: left;

    th {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0071428571em;
    }

    td {
      padding: 0px 5px;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.425;
      letter-spacing: 0.0178571429em;
    }
  }
</style>
