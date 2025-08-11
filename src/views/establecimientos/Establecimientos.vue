<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList
    :logo="true"
    :items="list"

    :class="getClasses"
    :mapping="mapping"/>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/establecimiento/getEstablecimiento.service'
import getByAny from '@/services/establecimiento/getEstablecimientoByAny.service'
import create from '@/services/establecimiento/createEstablecimiento.service'
import update from '@/services/establecimiento/updateEstablecimiento.service'
import { defineComponent } from 'vue'
import { eventStore } from '@/main'
import router from '@/router'
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
import { sort } from '@/utils/utils'
export default defineComponent({
	name: 'Establecimientos'
})
</script>

<script setup lang="ts">

eventStore.$onAction(({args, name}) => {
	switch(name) {
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
let cardClass = ref()
const titulo = ref('Establecimientos')
const list = ref()
const sortBy = ref({ field: 'nombre', order: 'ASC' })
const show = ref({ show: 0 })
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
  save: '/establecimientos'
}
eventStore.setRoutes(routes)
// Computed
const getClasses = computed(() => {
  return cardClass.value ? cardClass.value.join(' ') : ''
})

onMounted(() => {
  onShowCards(show.value)
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
  router.push('/establecimiento-edicion')
}

const onSaveCard = (cardData: any) => {
	if (cardData.adding) {
		createCard(cardData.data)
	} else {
		updateCard(cardData.data)
	}
}

const onSortCards = (evt: any) => {
  sortBy.value.order = evt.order === 0 ? 'ASC' : 'DESC'
  if (evt.order === 0) {
    list.value = list.value.sort(sort(sortBy.value.field))
  } else {
    list.value = list.value.sort(sort(`-${sortBy.value.field}`))
  }
}

const onShowCards = (evt: any) => {
  show.value = evt
  switch (evt.show) {
    case 0:
      cardClass.value = ['card', 'small']
      break
    case 1:
      cardClass.value = ['card', 'large']
      break
    case 2:
      cardClass.value = ['list']
      break
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
		getByAny(evt).then((response:EstablecimientoResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
