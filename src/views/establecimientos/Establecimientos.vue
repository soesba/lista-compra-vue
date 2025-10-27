<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList
    :logo="true"
    :items="list"
    :class="getClasses"
    :mapping="mapping"
    :sort-by="sortBy" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import get from '@/services/establecimiento/getEstablecimiento.service'
import searchEstablecimiento from '@/services/establecimiento/searchEstablecimiento.service'
import create from '@/services/establecimiento/createEstablecimiento.service'
import update from '@/services/establecimiento/updateEstablecimiento.service'
import { eventStore } from '@/main'
import router from '@/router'
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
import { sort } from '@/utils/utils'

eventStore.$onAction(({args, name}) => {
	switch(name) {
    case 'addCard':
      onAddCard()
      break
		case 'saveCard':
			onSaveCard(args[0])
			break
	}
})
// Data
let cardClass = ref()
const titulo = ref('Establecimientos')
const list = ref()
const sortBy = ref({ field: 'nombre', order: 'ASC' })
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
// Computed
const getClasses = computed(() => {
  return cardClass.value ? cardClass.value.join(' ') : ''
})

onMounted(() => {
	getAllData()
})

// Methods

const getAllData = () => {
	get().then((response: EstablecimientoResponse) => {
    const order = sortBy.value.order === 'ASC' ? '' : '-'
		list.value = (response.data as []).sort(sort(`${order}${sortBy.value.field}`))
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
		searchEstablecimiento(evt).then((response:EstablecimientoResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
