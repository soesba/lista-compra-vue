<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses">
    <template v-if="list.length > 0" #card-list_content>
      <v-card
        v-if="!vistaDetalle"
        v-for="item in list"
        :key="item.id"
        :card-data="item"
        link
        :to="getRoute(item)">
        <v-card-title>{{ item.nombre }}</v-card-title>
        <v-card-subtitle>{{ item.descripcion }}</v-card-subtitle>
        <v-card-text v-html="getText(item)" class="text-small" />
      </v-card>
      <v-card v-else></v-card>
    </template>
    <template v-else #card-list_empty>
      <empty-card></empty-card>
    </template>
  </CardList>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { default as EmptyCard } from '@/components/cards-system/EmptyCard.vue'
  import get from '@/services/articulo/getArticulo.service'
  import searchArticulo from '@/services/articulo/searchArticulo.service'
  import create from '@/services/articulo/createArticulo.service'
  import update from '@/services/articulo/updateArticulo.service'
  import { eventStore, modelStore, uiStore } from '@/main'
  import type ArticuloRequest from '@/services/articulo/models/ArticuloRequest'
  import type ArticuloResponse from '@/services/articulo/models/ArticuloResponse'
  import router from '@/router'
  import getArticuloWithDetail from '@/services/articulo/getArticuloWithDetail.service'

  const emit = defineEmits(['close-dialog'])

  eventStore.$onAction(({ args, name }) => {
    switch (name) {
      case 'addCard':
        onAddCard()
        break
      case 'saveCard':
        onSaveCard(args[0])
        break
      case 'sortCards':
        onSortCards(args[0])
        break
      case 'showCards':
        onShowCards(args[0])
        break
    }
  })
  // Data
  const modelo = 'Articulo'
  let cardClass = ref()
  const titulo = ref('Articulos')
  const list = ref<Array<any>>([])
  const orderReq = ref()

  const routes = {
    detail: '/articulo-detalle',
    edit: '/articulo-edicion',
    add: '/articulo-edicion',
    list: '/articulos'
  }
  eventStore.setRoutes(routes)

  // Anulamos cualquier articulo previamente almacenado
  modelStore.setArticulo(null)

  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : ''
  })

  const vistaDetalle = computed(() => {
    return uiStore.getMenuShowCards === 3
  })

  // Methods

  const getRoute = (item: any) => {
    return `${routes.detail}/${item.id}`
  }

  const getText = (item: any) => {
    return item.tienePrecios ? '<i class="f-18 mdi mdi-currency-eur"></i>' : '<div>&nbsp</div>'
  }

  const onAddCard = () => {
    router.push(routes.add)
  }

  const getAllData = (detail: boolean = false) => {
    if (!detail && !vistaDetalle.value) {
      get(orderReq.value).then((response: ArticuloResponse) => {
        list.value = response.data as []
      })
    } else {
      console.log('Vista detalle')
      getArticuloWithDetail(orderReq.value).then((response: ArticuloResponse) => {
        list.value = response.data as []
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
      searchArticulo(evt, orderReq.value).then((response: ArticuloResponse) => {
        list.value = response.data as []
      })
    } else {
      getAllData()
    }
  }

  const onSortCards = (evt: any) => {
    orderReq.value = {
      field: evt.field,
      direction: evt.order === 1 ? 'asc' : 'desc'
    }
    getAllData()
  }

  const onShowCards = (evt: any) => {
    const newValue = evt.show
    const oldValue = evt.oldValue

    if (newValue !== oldValue && newValue === 3) {
      getAllData(true)
    }
  }
</script>
