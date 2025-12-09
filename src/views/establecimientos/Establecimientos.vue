<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :logo="true" :items="list" :class="getClasses" :mapping="mapping" />
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import get from '@/services/establecimiento/getEstablecimiento.service'
  import searchEstablecimiento from '@/services/establecimiento/searchEstablecimiento.service'
  import create from '@/services/establecimiento/createEstablecimiento.service'
  import update from '@/services/establecimiento/updateEstablecimiento.service'
  import { eventStore, modelStore } from '@/main'
  import router from '@/router'
  import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
  import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'

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
  const modelo = 'Establecimiento'
  let cardClass = ref()
  const titulo = ref('Establecimientos')
  const list = ref([])
  const orderReq = ref()
  const mapping = {
    id: 'id',
    logo: 'logo',
    title: 'nombre',
    subtitle: 'tipoEstablecimientoNombre',
    text: 'fechaCreacion'
  }
  const routes = {
    detail: '/establecimiento-detalle',
    edit: '/establecimiento-edicion',
    add: '/establecimiento-edicion',
    list: '/establecimientos'
  }
  eventStore.setRoutes(routes)
  // Anulamos cualquier establecimiento previamente almacenado
  modelStore.setEstablecimiento(null)

  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : ''
  })

  // Methods
  const onAddCard = () => {
    router.push(routes.add)
  }

  const getAllData = async () => {
    list.value = (await get(orderReq.value)).data as []
  }

  const onSaveCard = (cardData: any) => {
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
      searchEstablecimiento(evt, orderReq.value).then((response: EstablecimientoResponse) => {
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
