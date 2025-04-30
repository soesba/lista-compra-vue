<template>
	<div class="title-container">
		<label>{{ titulo }}</label>
		<v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i" :value="i" @click="item.click(i)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
	</div>
</template>
<script setup lang="ts">
  import { markRaw, ref } from 'vue'
  import MenuDialog from '@/components/MenuDialog.vue'
  import { uiStore, eventCardStore } from '@/main'

  interface itemMenu {
    name: string,
    valorActual: number,
    subitems?: Array<any>,
    title: string,
    click: Function
  }

  const props = defineProps({
    titulo: String,
    menu: {
      type: Array<itemMenu>
    }
  })

  const defaultMenu: Array<any> = [
  { name: 'ordenar', title: 'Ordenar por', click: (i: any) => menuClick(i), valorActual: 0, subitems: [
    { title: 'Nombre ascendente', value: 0 },
    { title: 'Nombre descendente', value: 1 }
  ]},
	{ name: 'ver', title: 'Ver', click: (i: any) => menuClick(i), valorActual: 0, subitems: [
    { title: 'Tarjetas pequeñas', value: 0 },
    { title: 'Tarjetas grandes', value: 1 },
    { title: 'Lista', value: 2 }
  ]}
]

  const menu = ref(props.menu || defaultMenu)

  // Methods
  const menuClick = (index: number) => {
    if (index === 0) {
      uiStore.showCustomDialog({
        component: markRaw(MenuDialog),
        props: {
          menu: 'ordenar',
          value: menu.value.find(item => item.name === 'ordenar')?.valorActual,
          items: menu.value.find(item => item.name === 'ordenar')?.subitems
        },
        events: {
          click: (menu: string, value: number) => submenuClick(menu, value)
        }
      })
    } else if (index === 1) {
      uiStore.showCustomDialog({
        component: markRaw(MenuDialog),
        props: {
          menu: 'ver',
          value: menu.value.find(item => item.name === 'ver')?.valorActual,
          items: menu.value.find(item => item.name === 'ver')?.subitems
        },
        events: {
          click: (menu: string, value: number) => submenuClick(menu, value)
        }
      })
    }
  }

  const submenuClick = (submenu: string, index: number) => {
    const item = menu.value.find(item => item.name === submenu)
    if (item) {
      item.valorActual = index
    }
    if (submenu === 'ordenar') {
      eventCardStore.sortCards({ order: index})
    } else {
      eventCardStore.showCards({ show: index })
    }
  }
</script>
<style lang="scss" scoped>
	.title-container {
		padding: 10px;
		text-align: center;
		display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    @media (max-width: 640px) {
      font-size: 1.5rem;
    }
	}
</style>
