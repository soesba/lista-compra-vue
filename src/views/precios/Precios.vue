<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses" :mapping="mapping" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import get from '@/services/precio/getPrecios.service'
  import searchPrecio from '@/services/precio/searchPrecio.service'
  import create from '@/services/precio/createPrecio.service'
  import update from '@/services/precio/updatePrecio.service'
  import router from '@/router'
  import { eventStore, modelStore } from '@/main'
  import type PrecioRequest from '@/services/precio/models/PrecioRequest'
  import type PrecioResponse from '@/services/precio/models/PrecioResponse'
  import { dateToFront, formatCurrency } from '@/utils/utils'
  import Precio from '@/services/precio/models/Precio'

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
    }
  })
  // Data
  const modelo = 'Precio'
  let cardClass = ref()
  const titulo = ref('Precios')
  const list = ref([])
  const orderReq = ref()
  const mapping = {
    id: 'id',
    title: (item: Precio) => item.articulo.nombre,
    text: (item: Precio) => {
      return `${item.establecimiento?.nombre}\n
    ${getFechaCompra(item)}\n
    ${formatCurrency(item.precio)}`
    }
  }
  const routes = {
    detail: '/precio-detalle',
    edit: '/precio-edicion',
    add: '/precio-edicion',
    list: '/precios'
  }
  eventStore.setRoutes(routes)

  // Anulamos cualquier precio previamente almacenado
  modelStore.setPrecio(null)

  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : ''
  })

  // Methods
  const getFechaCompra = (item: any) => {
    return dateToFront(item.fechaCompra)
  }

  const getAllData = () => {
    get(orderReq.value).then((response: PrecioResponse) => {
      list.value = response.data as []
    })
  }

  const onAddCard = () => {
    router.push(routes.add)
  }

  const onSaveCard = (cardData: any) => {
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
      searchPrecio(evt, orderReq.value).then((response: PrecioResponse) => {
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
</script>
<style lang="scss" scoped>
  :deep(.v-card-text) {
    white-space: pre-line;
    font-size: 0.7rem;
    font-weight: 400;
    line-height: 1;
  }
</style>
