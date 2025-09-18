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
import { CardList, TitleView, SearchBox } from '@/components'
import get from '@/services/precio/getPrecio.service'
import searchPrecio from '@/services/precio/searchPrecio.service'
import create from '@/services/precio/createPrecio.service'
import update from '@/services/precio/updatePrecio.service'
import { defineComponent } from 'vue'
import router from '@/router'
import { eventStore } from '@/main';
import type PrecioRequest from '@/services/precio/models/PrecioRequest'
import type PrecioResponse from '@/services/precio/models/PrecioResponse'
import { sort, formatCurrency } from '@/utils/utils'
export default defineComponent({
	name: 'Precios'
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
const titulo = ref('Precios')
const list = ref()
const sortBy = ref({ field: 'articulo.nombre', order: 'ASC' })
const mapping = {
  id: 'id',
  title: (item: any) => item.articulo?.nombre || 'Sin nombre',
  text: (item: any) => {
    return `Establecimiento: ${item.establecimiento?.nombre}\n
    Última fecha compra: ${getFechaCompra(item)}\n
    Precio: ${formatCurrency(item.precio)}`
  }
}
const routes = {
  detail: '/precio-detalle',
  edit: '/precio-edicion',
  add: '/precio-edicion',
  list: '/precios'
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
const getFechaCompra = (item: any) => {
	return item.fechaCompra ? new Intl.DateTimeFormat('es-ES', {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(item.fechaCompra) : ''
}

const getAllData = () => {
	get().then((response: PrecioResponse) => {
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

const createCard = (card: PrecioRequest) => {
	card.borrable = true
	create(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const updateCard = (card: PrecioRequest) => {
	update(card).then(response => {
		if (response.respuesta === 200) {
			getAllData()
		}

	})
}

const onSearch = (evt: any) => {
	if (evt) {
		searchPrecio(evt).then((response:PrecioResponse) => {
			list.value = response.data
		})
	} else {
		getAllData()
	}
}

</script>
<style lang="scss" scoped>
:deep(.v-card-text) {
  white-space: pre-line;
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 1;
}
</style>
