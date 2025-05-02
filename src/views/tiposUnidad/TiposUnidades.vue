<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" @click-card="(evt: any) => verDetalle(evt)"  @addCard="onAddCard" :class="getClasses" :mapping="mapping"/>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue'
import router from '@/router'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/tipoUnidad/getTipoUnidad.service'
import getByAny from '@/services/tipoUnidad/getTipoUnidadByAny.service'
import create from '@/services/tipoUnidad/createTipoUnidad.service'
import update from '@/services/tipoUnidad/updateTipoUnidad.service'
import deleteItem from '@/services/tipoUnidad/deleteTipoUnidad.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type TipoUnidadRequest from '@/services/tipoUnidad/models/TipoUnidadRequest'
import type TipoUnidadResponse from '@/services/tipoUnidad/models/TipoUnidadResponse'
import { sort } from '@/utils/utils'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
export default defineComponent({
	name: 'TiposUnidades'
})
</script>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])

eventCardStore.$onAction(({args, name}) => {
	switch(name) {
    case 'addCard':
      onAddCard()
      break
		case 'saveCard':
			onSaveCard(args[0])
			break
		case 'deleteCard':
			onDeleteCard(args[0])
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
const titulo = ref('Tipos de unidades')
const list = ref()
const sortBy = ref({ field: 'nombre', order: 'ASC' })
const show = ref({ show: 0 })
const mapping = {
  id: 'id',
  title: 'nombre',
  subtitle: 'abreviatura',
  text: 'fechaCreacion'
}

// Computed
const getClasses = computed(() => {
  return cardClass.value ? cardClass.value.join(' ') : ''
})

onMounted(() => {
  onShowCards(show.value)
	getAllData()
})

const getAllData = () => {
	get().then((response: TipoUnidadResponse) => {
    const order = sortBy.value.order === 'ASC' ? '' : '-'
		list.value = (response.data as []).sort(sort(`${order}${sortBy.value.field}`))
	})
}

const verDetalle = (id: any) => {
  router.push(`/tiposUnidades-detalle/${id}`)
}

const onAddCard = () => {
  router.push('/tiposUnidades-edicion')
}

const onDeleteCard = (cardData: any) => {
	if (cardData.borrable) {
		deleteItem(cardData.id).then(response => {
			if (response.respuesta === 200) {
				getAllData()
			}
		})
	}
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
		getByAny(evt).then((response:TipoUnidadResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
