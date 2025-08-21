<template>
  <TitleView :titulo="titulo" /><SearchBox @search="onSearch"></SearchBox>
  <CardList
    :items="list"
    :class="getClasses"
    :mapping="mapping"
    :sort-by="sortBy" />
</template>

<script lang="ts">
import { onMounted, ref, computed, defineComponent } from 'vue'
import router from '@/router'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
import getByAny from '@/services/tipoEstablecimiento/getTipoEstablecimientoByAny.service'
import create from '@/services/tipoEstablecimiento/createTipoEstablecimiento.service'
import update from '@/services/tipoEstablecimiento/updateTipoEstablecimiento.service'
import { eventStore } from '@/main';
import type TipoEstablecimientoRequest from '@/services/tipoEstablecimiento/models/TipoEstablecimientoRequest'
import type TipoEstablecimientoResponse from '@/services/tipoEstablecimiento/models/TipoEstablecimientoResponse'
import { sort } from '@/utils/utils'
export default defineComponent({
	name: 'TiposEstablecimientos'
})
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
const titulo = ref('Categorías de establecimientos')
const list = ref()
const sortBy = ref({ field: 'nombre', order: 'ASC' })
const mapping = {
  id: 'id',
  title: 'nombre',
  subtitle: 'abreviatura',
  text: 'fechaCreacion'
}

const routes = {
  detail: '/tipoEstablecimiento-detalle',
  edit: '/tipoEstablecimiento-edicion',
  add: '/tipoEstablecimiento-edicion',
  list: '/tiposEstablecimientos'
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
	get().then((response: TipoEstablecimientoResponse) => {
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
		getByAny(evt).then((response:TipoEstablecimientoResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
