<template>
  <div class="container">
    <div class="title-container">
      <label class="titulo">{{ titulo }}</label>
      <label class="subtitulo" v-if="subtitulo">{{ subtitulo }}</label>
    </div>
    <v-menu v-if="showMenu">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in menu" :key="i" :value="i" @click="item.click(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
  import { markRaw, onMounted, ref } from 'vue'
  import MenuDialog from '@/components/MenuDialog.vue'
  import { uiStore, eventStore, authStore } from '@/main'

  interface itemMenu {
    name: string
    valorActual: number
    subitems?: Array<any>
    title: string
    click: Function
  }

  const props = defineProps({
    titulo: String,
    subtitulo: String,
    modelo: String,
    showMenu: {
      type: Boolean,
      default: true
    },
    menu: {
      type: Array<itemMenu>
    }
  })

  const configuraciones = ref<Array<any>>([])

  const defaultMenu = ref<Array<any>>([])

  const menu = ref<Array<any>>([])

  const modeloData = ref<any>(null)

  const preferencias = authStore.getPreferencias || []

  onMounted(async () => {
    if (props.modelo) {
      modeloData.value = uiStore.getModeloByNombre(props.modelo)
    }
    if (props.showMenu) {
      if (props.menu) {
        menu.value = props.menu
        return
      } else {
        // Si no se pasa menú por props, cargamos el menú por defecto
        // configuraciones.value = (await getConfiguracionesByCategoria('dots_menu')).data as Array<any>
        configuraciones.value = await uiStore.getConfiguraciones

        defaultMenu.value = configuraciones.value.map(config => {
          const prefUsuario = preferencias.find(
            (p: any) =>
              p.configuracionId === config.id && p.modeloId === (modeloData.value ? modeloData.value.id : null)
          )
          const valorActual = prefUsuario ? Number(prefUsuario.valor) : Number(config.valorDefecto)
          const itemMenu = {
            name: config.nombre,
            title: config.texto,
            valorActual: valorActual,
            subitems: config.valores.map((valor: any) => {
              return {
                title: valor.nombre,
                value: Number(valor.valor),
                direction: valor.direccion,
                click: (menu: string, value: number) => submenuClick(menu, value)
              }
            }),
            click: (i: any) => menuClick(i)
          }
          menu.value.push(itemMenu)
          // Llamamos el método para lanzar la acción correspondiente al cargar la vista: ordenar o ver como
          submenuClick(itemMenu.name, itemMenu.valorActual)
        })
      }
    }
  })

  // Methods
  const menuClick = (item: itemMenu) => {
    if (item.name === 'ordenar') {
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
    } else if (item.name === 'ver') {
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
      // Por ahora solo por nombre
      let field = 'title'
      let direccion = item.subitems[item.valorActual].direction
      eventStore.sortCards({ order: direccion, field })
      uiStore.setMenuSortCards(index)
    } else {
      eventStore.showCards({ show: index, oldValue: uiStore.getMenuShowCards })
      uiStore.setMenuShowCards(index)
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: rgb(var(--v-theme-primary));
    .subtitulo {
      display: block;
      flex: none;
      font-size: 0.875rem;
      font-weight: 400;
      letter-spacing: 0.0178571429em;
      opacity: var(--v-card-subtitle-opacity, var(--v-medium-emphasis-opacity));
      overflow: hidden;
      padding: 0 1rem;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
    }
    @media (max-width: 640px) {
      font-size: 1.25rem;
    }
  }
</style>
