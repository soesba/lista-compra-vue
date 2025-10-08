<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <router-link class="no-link" to="/">
      <v-toolbar-title>Precios compra</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <!-- <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template> -->
    <v-btn
      icon="mdi-dots-vertical">
      <v-icon icon="mdi-dots-vertical"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in dotsMenuItems"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="item.click">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary>
    <v-list :items="navigationMenuitems.filter((item) => item.visible !== false)"></v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { authStore, uiStore } from '@/main'
import { ref } from 'vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'NavigationComponent'
  })
</script>
<script setup lang="ts">

  const drawer = ref(false)
  const navigationMenuitems = ref([
  	{
  		title: 'Articulos',
  		props: {
  			to: '/articulos',
  			link: true
  		}
  	},
  	{
  		title: 'Tipo de unidades',
  		props: {
  			to: '/tiposUnidades',
  			link: true
  		}
  	},
  	{
  		title: 'Categorías de establecimientos',
  		props: {
  			to: '/tiposEstablecimientos',
  			link: true
  		}
  	},
  	{
  		title: 'Establecimientos',
  		props: {
  			to: '/establecimientos',
  			link: true
  		}
  	},
  	{
  		title: 'Precios',
  		props: {
  			to: '/precios',
  			link: true
  		}
  	},
    {
      title: 'Administración',
      props: {
        to: '/dashboard',
        link: true
      },
      visible: authStore.getUsuarioLogueado && authStore.getUsuarioLogueado.esAdministrador === true
    }
  ])

  const dotsMenuItems = [
    {
        title: 'Logout',
        click: () => {
          uiStore.showConfirmDialog({
            props: {
              text: '¿Desea cerrar la sesión?',
              title: 'Confirmación',
            },
            aceptarFn: authStore.logout,
          })
        }
    }
  ]
</script>
