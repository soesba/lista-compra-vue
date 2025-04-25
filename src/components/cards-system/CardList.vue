<template>
	<div class="wrapper-list" :class="getClasses">
		<div class="list-container" v-if="items && items?.length > 0">
			<Card :logo="logo" v-for="item in items" :key="item.id" :card-data="item" @click="onClick"/>
		</div>
		<div v-else>
			<empty-card></empty-card>
		</div>
		<div class="wrapper-add-button">
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
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits(['click'])
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
  size: String
})

	// Computed
	const getClasses = computed(() => {
		if (props.class === 'card') {
      return ['card', props.size]
    }
    return props.class
	})

// Methods
const onClick = (evt: string) => {
	// TODO
  console.log('Card clicked en CardList', evt)
  emit('click', evt)
}

// const addCard = () => {
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
// }
</script>
<style lang="scss" scoped>
	.wrapper-list {
		.wrapper-add-button {
			position: fixed;
			width: 100%;
			bottom: 40px;
			right: 20px;
		}
		&.card {
			.list-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
				flex-wrap: wrap;
				margin: 0 auto;
				margin-bottom: 60px; // salvar boton de añadir
			}
		}
    &.medium {
      .list-container {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
		&.column-list {
      display: flex;
			justify-content: center;
			.list-container {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin: 0 auto;
				margin-bottom: 60px; // salvar boton de añadir
			}
		}
	}


</style>
