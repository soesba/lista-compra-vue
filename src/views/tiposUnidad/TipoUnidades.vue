<template>
  <TitleView :titulo="titulo" :modelo="modelo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses" :mapping="mapping" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import router from '@/router'
  import get from '@/services/tipoUnidad/getTipoUnidad.service'
  import searchTipoUnidad from '@/services/tipoUnidad/searchTipoUnidad.service'
  import create from '@/services/tipoUnidad/createTipoUnidad.service'
  import update from '@/services/tipoUnidad/updateTipoUnidad.service'
  import { eventStore, modelStore } from '@/main'
  import type TipoUnidadRequest from '@/services/tipoUnidad/models/TipoUnidadRequest'
  import type TipoUnidadResponse from '@/services/tipoUnidad/models/TipoUnidadResponse'
  import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
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
  const modelo = 'TipoUnidad'
  let cardClass = ref()
  const titulo = ref('Tipos de unidades')
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
    detail: '/tiposUnidades-detalle',
    edit: '/tiposUnidades-edicion',
    add: '/tiposUnidades-edicion',
    list: '/tiposUnidades'
  }
  eventStore.setRoutes(routes)
  // Anulamos cualquier tipo de unidad previamente almacenado
  modelStore.setTipoUnidad(null)


  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : ''
  })

  // Methods
  const getAllData = () => {
    get(orderReq.value).then((response: TipoUnidadResponse) => {
      list.value = response.data as []
    })
  }

  const onAddCard = () => {
    router.push(routes.add)
  }

  const onSaveCard = (cardData: any) => {
    const tipoUnidad = cardData.data.value
    delete tipoUnidad.tmpId
    tipoUnidad.equivalencias = tipoUnidad.equivalencias.map((item: Equivalencia) => {
      delete item.tmpId
      return item
    })
    if (cardData.adding) {
      createCard(tipoUnidad)
    } else {
      updateCard(tipoUnidad)
    }
  }

  const createCard = (card: TipoUnidadRequest) => {
    card.borrable = true
    create(card).then((response: any) => {
      if (response.respuesta === 200) {
        getAllData()
      }
    })
  }

  const updateCard = (card: TipoUnidadRequest) => {
    update(card).then((response: any) => {
      if (response.respuesta === 200) {
        getAllData()
      }
    })
  }

  const onSearch = (evt: any) => {
    if (evt) {
      searchTipoUnidad(evt, orderReq.value).then((response: TipoUnidadResponse) => {
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
