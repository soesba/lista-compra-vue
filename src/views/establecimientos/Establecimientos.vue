<template>
  <TitleView :titulo="titulo" :menu="menu" @menuClick="menuClick"/>
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :logo="true" :items="list" @click="(evt) => verDetalle(evt)" />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/establecimiento/getEstablecimiento.service'
import getByAny from '@/services/establecimiento/getEstablecimientoByAny.service'
import create from '@/services/establecimiento/createEstablecimiento.service'
import update from '@/services/establecimiento/updateEstablecimiento.service'
import deleteItem from '@/services/establecimiento/deleteEstablecimiento.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import router from '@/router'
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
import { sort } from '@/utils/utils'
export default defineComponent({
	name: 'Establecimientos'
})
</script>

<script setup lang="ts">

eventCardStore.$onAction(({args, name}) => {
	switch(name) {
		case 'saveCard':
			onSaveCard(args[0])
			break
		case 'deleteCard':
			onDeleteCard(args[0])
			break
	}
})
// Data
const titulo = ref('Establecimientos')
const list = ref()
const menu = ref([
	{ title: 'Ordenar por nombre ascendente', click: () => list.value = list.value.sort(sort('title'))},
	{ title: 'Ordenar por nombre descendente', click: () => list.value = list.value.sort(sort('-title'))},
])

onMounted(() => {
	getAllData()
})

// Methods
const menuClick = (index: number) => {
  menu.value[index].click.call(this)
}

const dataToCard = (list: any) => {
  return list.map((item: any) => {
    return {
      id: item.id,
      logo: item.logo,
      title: item.nombre,
      subtitle: item.tipoEstablecimiento.nombre,
      text: `Creado: ${item.fechaCreacion}`
    }
  })
}

const getAllData = () => {
	get().then((response: EstablecimientoResponse) => {
		list.value = dataToCard(response.data)
	})
}

const verDetalle = (id: any) => {
  router.push(`/establecimiento-detalle/${id}`)
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
		getByAny(evt).then((response:EstablecimientoResponse) => {
			list.value = dataToCard(response.data)
		})
	} else {
		getAllData()
	}
}

</script>
