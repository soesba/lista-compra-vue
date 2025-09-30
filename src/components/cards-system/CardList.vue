<template>
	<div class="wrapper-list">
		<div class="list-container" v-if="items && items?.length > 0" :class="cardClass">
			<Card
        :logo="logo"
        :mapping="mapping"
        v-for="item in items"
        :key="item.id"
        :card-data="item"/>
		</div>
		<div v-else>
			<empty-card></empty-card>
		</div>
		<div v-if="addButton" class="wrapper-add-button">
			<v-fab
				icon="mdi-plus"
				class="ms-4"
				location="bottom end"
				absolute
				offset
				color="primary"
				@click="addCard()"
			></v-fab>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'CardList',
})
</script>
<script setup lang="ts">
import { EmptyCard, Card } from '@/components/index'
import { eventStore } from '@/main'
import router from '@/router'
import { sort } from '@/utils/utils';
import { defineComponent, onMounted, ref } from 'vue'

const emit = defineEmits(['addCard'])

eventStore.$onAction(({args, name}) => {
	switch(name) {
    case 'sortCards':
			onSortCards(args[0])
			break
		case 'showCards':
			onShowCards(args[0])
			break
	}
})

const props = defineProps({
	items: {
    type: Array<any>,
    default: () => []
  },
	logo: {
    type: Boolean,
    default: false,
  },
	addButton: {
		type: Boolean,
		default: true,
	},
	class: {
		type: String,
		default: 'card',
	},
  mapping: {
    type: Object,
    default: () => ({}),
  },
  sortBy: {
    type: Object,
    default: () => ({ field: 'nombre', order: 'ASC' })
  },
  show: {
    type: Object,
    default: () => ({ show: 0 })
  }
})

const list = ref(props.items || [])
const sortBy = ref(props.sortBy)
const show = ref(parseInt(import.meta.env.VITE_SHOW_CARDS))
const cardClass = ref([props.class])
const routes = eventStore.getRoutes

onMounted(() => {
  onShowCards(show.value)
})

// Methods

const addCard = () => {
  router.push(routes.add)
}

const onSortCards = (evt: any) => {
  sortBy.value.order = evt.order === 0 ? 'ASC' : 'DESC'
  if (evt.order === 0) {
    list.value = props.items.sort(sort(sortBy.value.field))
  } else {
    list.value = props.items.sort(sort(`-${sortBy.value.field}`))
  }
}

const onShowCards = (evt: any) => {
  show.value = evt.show
  switch (show.value) {
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

</script>
<style lang="scss" scoped>
	.wrapper-list {
		.wrapper-add-button {
			position: fixed;
			width: 100%;
			bottom: 40px;
			right: 20px;
		}
    .list-container {
      &.card {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
      }
      &.large {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        margin-bottom: 60px; // salvar boton de añadir
      }
      &.list {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
        :deep(.v-card) {
          // box-shadow: none;
          // margin: 0px;
          display: flex;
          flex-direction: row;
          width: 80vw;
          max-width: 90vm;
          text-align: left;
          .v-card-title {
            flex: 1.5;
          }
          .v-card-subtitle {
            flex: 1;
            align-self: center;
            font-size: 1rem;
          }
          .text-small {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
	}


</style>
