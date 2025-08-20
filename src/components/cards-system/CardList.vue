<template>
	<div class="wrapper-list">
		<div class="list-container" v-if="items && items?.length > 0" :class="cardClass">
			<Card
        :logo="logo"
        :mapping="mapping"
        v-for="item in items"
        :key="item.id"
        :card-data="item"

        @click="onClick"/>
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

const emit = defineEmits(['click-card', 'addCard'])

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
const show = ref(props.show)
const cardClass = ref([props.class])
const routes = eventStore.getRoutes

onMounted(() => {
  onShowCards(show.value)
})

// Methods
const onClick = (evt: string) => {
  router.push(`${routes.detail}/${evt}`)
}

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
      }
      &.list {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
        .v-card {
          max-width: 70%;
          width: 50%;
        }
      }
    }
	}


</style>
