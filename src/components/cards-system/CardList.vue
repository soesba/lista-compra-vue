<template>
	<div class="wrapper-list">
		<div class="list-container" v-if="items && items?.length > 0" :class="getClasses">
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
import { computed, defineComponent } from 'vue'
const emit = defineEmits(['click-card', 'addCard'])
const props = defineProps({
	items: Array<any>,
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
  }
})

const routes = eventStore.getRoutes
console.log('LOG~ ~ :62 ~ routes:', routes)
// Computed
const getClasses = computed(() => {
  return props.class
})

// Methods
const onClick = (evt: string) => {
  router.push(`${routes.detail}/${evt}`)
}

const addCard = () => {
  router.push(routes.add)
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
