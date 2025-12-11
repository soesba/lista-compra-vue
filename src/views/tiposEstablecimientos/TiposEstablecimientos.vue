<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses" :mapping="mapping" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import router from '@/router'
  import get from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
  import searchTipoEstablecimiento from '@/services/tipoEstablecimiento/searchTipoEstablecimiento.service'
  import create from '@/services/tipoEstablecimiento/createTipoEstablecimiento.service'
  import update from '@/services/tipoEstablecimiento/updateTipoEstablecimiento.service'
  import { eventStore, modelStore } from '@/main'
  import type TipoEstablecimientoRequest from '@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest'
  import type TipoEstablecimientoResponse from '@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse'
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
  const modelo = 'TipoEstablecimiento'
  let cardClass = ref()
  const titulo = ref('Categorías de establecimientos')
  const list = ref([])
  const orderReq = ref()
  const mapping = {
    id: 'id',
    title: 'nombre',
    subtitle: 'abreviatura',
    text: (item: any) =>
      item.esMaestro
        ? '<i class="f-18 mdi mdi-lock"></i>'
        : '<i class="f-18 mdi mdi-lock-open"></i>'
  }

  const routes = {
    detail: '/tipoEstablecimiento-detalle',
    edit: '/tipoEstablecimiento-edicion',
    add: '/tipoEstablecimiento-edicion',
    list: '/tiposEstablecimientos'
  }
  eventStore.setRoutes(routes)
  // Anulamos cualquier tipo de establecimiento previamente almacenado
  modelStore.setTipoEstablecimiento(null)


  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : ''
  })

    // Methods

  const getAllData = () => {
    get(orderReq.value).then((response: TipoEstablecimientoResponse) => {
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
      searchTipoEstablecimiento(evt, orderReq.value).then((response: TipoEstablecimientoResponse) => {
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
