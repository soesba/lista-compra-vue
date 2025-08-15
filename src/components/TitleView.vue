<template>
	<div class="title-container">
		<label>{{ titulo }}</label>
    <Button rounded severity="secondary" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
		<Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
	</div>
</template>
<script setup lang="ts">
  import { Button } from 'primevue';
  import Menu from 'primevue/menu';
  import { markRaw, ref } from 'vue'
  import MenuDialog from '@/components/MenuDialog.vue'
  import { uiStore, eventStore } from '@/main'

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
  const menu = ref();

  const defaultMenu: Array<any> = [
  // { name: 'ordenar', label: 'Ordenar por', click: (i: any) => menuClick(i), valorActual: 0, subitems: [
  //   { title: 'Nombre ascendente', value: 0 },
  //   { title: 'Nombre descendente', value: 1 }
  // ]},
	// { name: 'ver', label: 'Ver', click: (i: any) => menuClick(i), valorActual: 0, subitems: [
  //   { title: 'Tarjetas pequeñas', value: 0 },
  //   { title: 'Tarjetas grandes', value: 1 },
  //   { title: 'Lista', value: 2 }
  // ]}
    { name: 'ordenar', label: 'Ordenar por', command: () => menuClick(0), valorActual: 0, subitems: [
    { title: 'Nombre ascendente', value: 0 },
    { title: 'Nombre descendente', value: 1 }
  ]},
	{ name: 'ver', label: 'Ver', command: () => menuClick(1), valorActual: 0, subitems: [
    { title: 'Tarjetas pequeñas', value: 0 },
    { title: 'Tarjetas grandes', value: 1 },
    { title: 'Lista', value: 2 }
  ]}
]

  const menuItems = ref(props.menu || defaultMenu)

  // Methods
  const toggle = (event: any) => {
    menu.value.toggle(event);
};

  const menuClick = (index: number) => {
    if (index === 0) {
      uiStore.showCustomDialog({
        component: markRaw(MenuDialog),
        props: {
          menu: 'ordenar',
          value: menuItems.value.find((item: itemMenu) => item.name === 'ordenar')?.valorActual,
          items: menuItems.value.find((item: itemMenu) => item.name === 'ordenar')?.subitems
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
          value: menuItems.value.find((item: itemMenu) => item.name === 'ver')?.valorActual,
          items: menuItems.value.find((item: itemMenu) => item.name === 'ver')?.subitems
        },
        events: {
          click: (menu: string, value: number) => submenuClick(menu, value)
        }
      })
    }
  }

  const submenuClick = (submenu: string, index: number) => {
    const item = menu.value.find((item: itemMenu) => item.name === submenu)
    if (item) {
      item.valorActual = index
    }
    if (submenu === 'ordenar') {
      eventStore.sortCards({ order: index})
    } else {
      eventStore.showCards({ show: index })
    }
  }
</script>
<style lang="scss" scoped>
  button {
    background-color: inherit;
    border-color: transparent;
  }
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
