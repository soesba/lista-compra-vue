<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="TipoUnidadCard"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type TipoUnidadRequest from '@/services/tipoUnidad/models/TipoUnidadRequest'
import type TipoUnidadResponse from '@/services/tipoUnidad/models/TipoUnidadResponse'
export default defineComponent({
  name: 'TiposUnidades'
})
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/tipoUnidad/getTipoUnidad.service'
import getByAny from '@/services/tipoUnidad/getTipoUnidadByAny.service'
import create from '@/services/tipoUnidad/createTipoUnidad.service'

const emit = defineEmits(['close-dialog'])

const suscribe = eventCardStore.$onAction(({args, name}) => {
	console.log("🚀 ~ suscribe ~ evtData:", args[0], name)
  switch(name) {
    case 'saveCard': 
      onSaveCard(args[0])
      break
    case 'deleteCard':
      onDeleteCard(args[0])
      break
  }
})
// Data
const titulo = ref('Tipos de unidades')
const list = ref()

onMounted(() => {
  getAllData()
})

// Methods
const getAllData = () => {
  get().then((response: TipoUnidadResponse) => {
    list.value = response.data
  })
}

const onDeleteCard = (cardData: any) => {
		
}

const onSaveCard = (cardData: any) => {
  console.log("🚀 ~ onAddCard ~ data:", cardData)
  if (cardData.adding) {
    createCard(cardData.data)
  }
}

const createCard = (card: TipoUnidadRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:TipoUnidadResponse) => {
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>