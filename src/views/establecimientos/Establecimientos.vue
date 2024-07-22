<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="EstablecimientoCard"/>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/establecimiento/getEstablecimiento.service'
import getByAny from '@/services/establecimiento/getEstablecimientoByAny.service'
import create from '@/services/establecimiento/createEstablecimiento.service'
import update from '@/services/establecimiento/updateEstablecimiento.service'
import deleteItem from '@/services/establecimiento/deleteEstablecimiento.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
export default defineComponent({
  name: 'Establecimientos'
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
const titulo = ref('Establecimientos')
const list = ref()

onMounted(() => {
  getAllData()
})

// Methods
const getAllData = () => {
  get().then((response: EstablecimientoResponse) => {
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

const createCard = (card: EstablecimientoRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const updateCard = (card: EstablecimientoRequest) => {
  update(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:EstablecimientoResponse) => {
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>