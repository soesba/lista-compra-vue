<template>
  <TitleView :titulo="titulo">
    <template v-slot:menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in itemsMenu"
            :key="i" :value="i" @click="handleClick(i)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </TitleView>
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" component="EstablecimientoCard"/>
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
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoResponse from '@/services/establecimiento/models/EstablecimientoResponse'
import { sort } from '@/utils/utils'
export default defineComponent({
	name: 'Establecimientos'
})
</script>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])

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
const itemsMenu = ref([
	{ title: 'Ordenar por nombre ascendente', click: () => list.value = list.value.sort(sort('nombre'))},
	{ title: 'Ordenar por nombre descendente', click: () => list.value = list.value.sort(sort('-nombre'))},
])

onMounted(() => {
	getAllData()
})

// Methods
const handleClick = (index: number) => {
	itemsMenu.value[index].click.call(this)
}

const getAllData = () => {
	get().then((response: EstablecimientoResponse) => {
		list.value = response.data
		handleClick(0)
	})
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
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
