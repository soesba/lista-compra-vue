<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList
    :items="list"
    :class="getClasses"
    :mapping="mapping"
    :sort-by="sortBy" />
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue'
import router from '@/router'
import get from '@/services/tipoUnidad/getTipoUnidad.service'
import searchTipoUnidad from '@/services/tipoUnidad/searchTipoUnidad.service'
import create from '@/services/tipoUnidad/createTipoUnidad.service'
import update from '@/services/tipoUnidad/updateTipoUnidad.service'
import { eventStore } from '@/store/instances';
import type TipoUnidadRequest from '@/services/tipoUnidad/models/TipoUnidadRequest'
import type TipoUnidadResponse from '@/services/tipoUnidad/models/TipoUnidadResponse'
import { sort } from '@/utils/utils'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'

</script>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])

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
const titulo = ref('Tipos de unidades')
const list = ref()
const sortBy = ref({ field: 'nombre', order: 'ASC' })
const mapping = {
  id: 'id',
  title: 'nombre',
  subtitle: 'abreviatura',
  text: 'fechaCreacion'
}

const routes = {
  detail: '/tiposUnidades-detalle',
  edit: '/tiposUnidades-edicion',
  add: '/tiposUnidades-edicion',
  list: '/tiposUnidades'
}
eventStore.setRoutes(routes)

// Computed
const getClasses = computed(() => {
  return cardClass.value ? cardClass.value.join(' ') : ''
})

onMounted(() => {
	getAllData()
})

const getAllData = () => {
	get().then((response: TipoUnidadResponse) => {
    const order = sortBy.value.order === 'ASC' ? '' : '-'
		list.value = (response.data as []).sort(sort(`${order}${sortBy.value.field}`))
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
	create(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const updateCard = (card: TipoUnidadRequest) => {
	update(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const onSearch = (evt: any) => {
	if (evt) {
		searchTipoUnidad(evt).then((response:TipoUnidadResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
