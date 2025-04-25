<template>
  <TitleView :titulo="titulo" :menu="menu"  @menuClick="menuClick"/>
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" @click="(evt) => verDetalle(evt)" size="medium" />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/articulo/getArticulo.service'
import getByAny from '@/services/articulo/getArticuloByAny.service'
import create from '@/services/articulo/createArticulo.service'
import update from '@/services/articulo/updateArticulo.service'
import { defineComponent } from 'vue'
import { eventCardStore } from '@/main';
import type ArticuloRequest from '@/services/articulo/models/ArticuloRequest'
import type ArticuloResponse from '@/services/articulo/models/ArticuloResponse'
import { sort } from '@/utils/utils'
import router from '@/router'
export default defineComponent({
	name: 'Articulos'
})
</script>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])

eventCardStore.$onAction(({args, name}) => {
	switch(name) {
		case 'saveCard':
			onSaveCard(args[0])
			break
	}
})
// Data
const titulo = ref('Articulos')
const list = ref()
const menu = ref([
	{ title: 'Ordenar por nombre ascendente', click: () => list.value = list.value.sort(sort('nombre'))},
	{ title: 'Ordenar por nombre descendente', click: () => list.value = list.value.sort(sort('-nombre'))},
])

onMounted(() => {
	getAllData()
})

// Methods
const menuClick = (index: number) => {
  menu.value[index].click.call(this)
}

const verDetalle = (id: any) => {
  router.push(`/articulo-detalle/${id}`)
}

const dataToCard = (list: any) => {
  return list.map((item: any) => {
    return {
      id: item.id,
      title: item.nombre,
      subtitle: item.descripcion,
      text: item.tienePrecios ? 'Se han introducido precios' : 'No se han introducido precios'
    }
  })
}

const getAllData = () => {
	get().then((response: ArticuloResponse) => {
		list.value = dataToCard(response.data)
	})
}

const onSaveCard = (cardData: any) => {
	if (cardData.adding) {
		createCard(cardData.data)
	} else {
		updateCard(cardData.data)
	}
}

const createCard = (card: ArticuloRequest) => {
	card.borrable = true
	create(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const updateCard = (card: ArticuloRequest) => {
	update(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const onSearch = (evt: any) => {
	if (evt) {
		getByAny(evt).then((response:ArticuloResponse) => {
			list.value = dataToCard(response.data)
		})
	} else {
		getAllData()
	}
}

</script>
