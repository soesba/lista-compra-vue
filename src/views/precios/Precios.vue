<template>
  <TitleView :titulo="titulo">
    <template v-slot:menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in itemsMenu"
            :key="i" :value="i" @click="handleClick(i)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </TitleView>
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="PrecioCard" class="list"/>
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
import { sort } from '@/utils/utils'
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
const list = ref()
const itemsMenu = ref([
  { title: 'Ordenar por nombre ascendente', click: () =>  list.value = list.value.sort(sort('articulo.nombre'))},
  { title: 'Ordenar por nombre descendente', click: () =>  list.value = list.value.sort(sort('-articulo.nombre'))},
])

onMounted(() => {
  getAllData()
})

// Methods
const handleClick = (index) => {
  itemsMenu.value[index].click.call(this)
}

const getAllData = () => {
  get().then((response: PrecioResponse) => {
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
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>