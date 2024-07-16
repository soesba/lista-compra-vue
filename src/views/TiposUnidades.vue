<template>
  <TitleView :titulo="titulo" />
  <SearchBox></SearchBox>
  <CardList :items="list" component="TipoUnidadCard" @saveCard="onSaveCard"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
export default defineComponent({
  name: 'TiposUnidades'
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/tipoUnidad/getTipoUnidad.service'

const suscribe = eventCardStore.$onAction(({args, name}) => {
	console.log("🚀 ~ suscribe ~ evtData:", args, name)
})
// Data
const titulo = ref('Tipos de unidades')
const list = ref()

// Methods
get().then((response:any) => {
  list.value = response.data
})

const onSaveCard = (data: any, adding: boolean) => {
  console.log("🚀 ~ onAddCard ~ data:", data)
}

</script>