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
        <v-card-subtitle>{{ item.abreviatura }}</v-card-subtitle>
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
  import { ref, computed } from 'vue'
  import { default as EmptyCard } from '@/components/cards-system/EmptyCard.vue'
  import router from '@/router'
  import get from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
  import searchTipoEstablecimiento from '@/services/tipoEstablecimiento/searchTipoEstablecimiento.service'
  import create from '@/services/tipoEstablecimiento/createTipoEstablecimiento.service'
  import update from '@/services/tipoEstablecimiento/updateTipoEstablecimiento.service'
  import { eventStore, modelStore, uiStore } from '@/main'
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
  const list = ref<Array<any>>([])
  const orderReq = ref()

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

  const vistaDetalle = computed(() => {
    return uiStore.getMenuShowCards === 3
  })

  // Methods

  const getRoute = (item: any) => {
    return `${routes.detail}/${item.id}`
  }

  const getText = (item: any) => {
    return  item.esMaestro
        ? '<i class="f-18 mdi mdi-lock"></i>'
        : '<i class="f-18 mdi mdi-lock-open"></i>'
  }

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
