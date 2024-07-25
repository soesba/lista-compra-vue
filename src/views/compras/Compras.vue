<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="CompraCard" class="list"/>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/compra/getCompra.service'
import getByAny from '@/services/compra/getCompraByAny.service'
import create from '@/services/compra/createCompra.service'
import update from '@/services/compra/updateCompra.service'
import deleteItem from '@/services/compra/deleteCompra.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type CompraRequest from '@/services/compra/models/CompraRequest'
import type CompraResponse from '@/services/compra/models/CompraResponse'
export default defineComponent({
  name: 'Compras'
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
const titulo = ref('Compras')
const list = ref()

onMounted(() => {
  getAllData()
})

// Methods
const getAllData = () => {
  get().then((response: CompraResponse) => {
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

const createCard = (card: CompraRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const updateCard = (card: CompraRequest) => {
  update(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:CompraResponse) => {
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>