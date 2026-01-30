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
        <v-img class="logo" :src="getImageSrc(item)"></v-img>
        <v-card-title>{{ item.nombre }}</v-card-title>
        <v-card-subtitle>{{ item.tipoEstablecimientoNombre }}</v-card-subtitle>
        <v-card-text class="text-small"> {{ item.fechaCreacion }}</v-card-text>
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
  import get from '@/services/establecimiento/getEstablecimiento.service'
  import searchEstablecimiento from '@/services/establecimiento/searchEstablecimiento.service'
  import create from '@/services/establecimiento/createEstablecimiento.service'
  import update from '@/services/establecimiento/updateEstablecimiento.service'
  import { eventStore, modelStore, uiStore } from '@/main'
  import router from '@/router'
  import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
  import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
  import { noLogoUrl } from '@/main'

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
  const list = ref<Array<any>>([])
  const orderReq = ref()
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

  const vistaDetalle = computed(() => {
    return uiStore.getMenuShowCards === 3
  })

  // Methods

  const getRoute = (item: any) => {
    return `${routes.detail}/${item.id}`
  }

  const getImageSrc = (item: any) => {
    return item.logo
      ? item.logo.content
      : noLogoUrl
  }

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
