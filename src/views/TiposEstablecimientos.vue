<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="TipoEstablecimientoCard"/>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
import getByAny from '@/services/tipoEstablecimiento/getTipoEstablecimientoByAny.service'
import create from '@/services/tipoEstablecimiento/createTipoEstablecimiento.service'
import update from '@/services/tipoEstablecimiento/updateTipoEstablecimiento.service'
import deleteItem from '@/services/tipoEstablecimiento/deleteTipoEstablecimiento.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type TipoEstablecimientoRequest from '@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest'
import type TipoEstablecimientoResponse from '@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse'
export default defineComponent({
  name: 'TiposEstablecimientos'
})
</script>

<script setup lang="ts">
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
const titulo = ref('Tipos de establecimientos')
const list = ref()

onMounted(() => {
  getAllData()
})

// Methods
const getAllData = () => {
  get().then((response: TipoEstablecimientoResponse) => {
    list.value = response.data
  })
}

const onDeleteCard = (cardData: any) => {
  console.log("🚀 ~ onDeleteCard ~ cardData:", cardData)
  if (cardData.borrable) {
    deleteItem(cardData.id).then(response => {
      if (response.respuesta === 200) {
        getAllData()
      }
    })
  }
}

const onSaveCard = (cardData: any) => {
  console.log("🚀 ~ onAddCard ~ data:", cardData)
  if (cardData.adding) {
    createCard(cardData.data)
  } else {
    updateCard(cardData.data)
  }
}

const createCard = (card: TipoEstablecimientoRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const updateCard = (card: TipoEstablecimientoRequest) => {
  update(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:TipoEstablecimientoResponse) => {
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>