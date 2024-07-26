<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="listaPrecios" component="PrecioCard" class="list"/>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/precio/getPrecio.service'
import getByAny from '@/services/precio/getPrecioByAny.service'
import create from '@/services/precio/createPrecio.service'
import update from '@/services/precio/updatePrecio.service'
import deleteItem from '@/services/precio/deletePrecio.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type PrecioRequest from '@/services/precio/models/PrecioRequest'
import type PrecioResponse from '@/services/precio/models/PrecioResponse'
export default defineComponent({
  name: 'Precios'
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
const titulo = ref('Precios')
const listaPrecios = ref()

onMounted(() => {
  getAllData()
})

// Methods
const getAllData = () => {
  get().then((response: PrecioResponse) => {
    listaPrecios.value = response.data
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

const createCard = (card: PrecioRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const updateCard = (card: PrecioRequest) => {
  update(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:PrecioResponse) => {
      listaPrecios.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>