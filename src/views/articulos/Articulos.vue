<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses" :mapping="mapping" />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
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
  const list = ref([])
  const orderReq = ref()
  const mapping = {
    id: 'id',
    title: 'nombre',
    subtitle: 'descripcion',
    text: (item: any) =>
      // item.tienePrecios ? 'Se han introducido precios' : 'No se han introducido precios',
      item.tienePrecios ? '<i class="f-18 mdi mdi-currency-eur"></i>' : '<div>&nbsp</div>'
  }
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
    console.log('LOG~ ~ :67 ~ uiStore.getMenuShowCards:', uiStore.getMenuShowCards)
    return uiStore.getMenuShowCards === 3
  })

  // Methods
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
