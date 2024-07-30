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
  <CardList :items="list" component="ArticuloCard" class="list"/>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/articulo/getArticulo.service'
import getByAny from '@/services/articulo/getArticuloByAny.service'
import create from '@/services/articulo/createArticulo.service'
import update from '@/services/articulo/updateArticulo.service'
import deleteItem from '@/services/articulo/deleteArticulo.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type ArticuloRequest from '@/services/articulo/models/ArticuloRequest'
import type ArticuloResponse from '@/services/articulo/models/ArticuloResponse'
import { sort } from '@/utils/utils'
export default defineComponent({
  name: 'Articulos'
})
</script>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])

const suscribe = eventCardStore.$onAction(({args, name}) => {
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
const titulo = ref('Articulos')
const list = ref()
const itemsMenu = ref([
  { title: 'Ordenar por nombre ascendente', click: () =>  list.value = list.value.sort(sort('nombre'))},
  { title: 'Ordenar por nombre descendente', click: () =>  list.value = list.value.sort(sort('-nombre'))},
])
onMounted(() => {
  getAllData()
})

// Methods
const handleClick = (index: number) => {
  itemsMenu.value[index].click.call(this)
}

const getAllData = () => {
  get().then((response: ArticuloResponse) => {
    list.value = response.data
    handleClick(0)
  })
}

const onDeleteCard = (cardData: any) => {
  if (cardData.borrable) {
    deleteItem(cardData.id).then(response => {
      if (response.respuesta === 200) {
        getAllData()
      }
    })
  }
}

const onSaveCard = (cardData: any) => {
  if (cardData.adding) {
    createCard(cardData.data)
  } else {
    updateCard(cardData.data)
  }
}

const createCard = (card: ArticuloRequest) => {
  card.borrable = true
  create(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const updateCard = (card: ArticuloRequest) => {
  update(card).then(response => {
    if (response.respuesta === 200) {
      getAllData()
    }
    
  })
}

const onSearch = (evt: any) => {
  if (evt) {
    getByAny(evt).then((response:ArticuloResponse) => {
      list.value = response.data
    })
  } else {
    getAllData()
  }
}

</script>