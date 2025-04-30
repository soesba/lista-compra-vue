<template>
	<div class="wrapper-list">
		<div class="list-container" v-if="items && items?.length > 0" :class="getClasses">
			<Card :logo="logo" :mapping="mapping" v-for="item in items" :key="item.id" :card-data="item" @click-card="onClick"/>
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
import { computed, defineComponent } from 'vue'
export default defineComponent({
	name: 'CardList',
})
</script>
<script setup lang="ts">
import { EmptyCard, Card } from '@/components/index'
const emit = defineEmits(['click-card'])
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

	// Computed
	const getClasses = computed(() => {
    return props.class
	})

// Methods
const onClick = (evt: string) => {
	// TODO
  emit('click-card', evt)
}

const addCard = () => {
  // TODO
// 	if (props.component === 'EstablecimientoCard') {
// 		router.push('/establecimiento-edicion')
// 	} else if (props.component === 'PrecioCard') {
// 		router.push('/precio-edicion')
// 	} else {
// 		uiStore.showCustomDialog({
// 			component: markRaw(getComponentDialog() as object),
// 			props: {
// 				adding: true,
// 				data: {
// 					borrable: true,
// 				},
// 			},
// 		})
// 	}
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
