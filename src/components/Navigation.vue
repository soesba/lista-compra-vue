<template>
  <v-app-bar color="primary" prominent class="app-bar">
    <div v-if="$slots.left" class="left-slot">
      <slot name="left" />
    </div>
    <div v-else class="left-slot">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </div>
    <div v-if="$slots.center" class="center-slot">
      <slot name="center" />
    </div>
    <div v-else class="center-slot">
      <router-link class="no-link" to="/">
        <v-toolbar-title>Precios compra</v-toolbar-title>
      </router-link>
    </div>

    <!-- <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template> -->
    <div v-if="$slots.right" class="right-slot">
      <slot name="right" />
    </div>
    <div v-else class="right-slot">
      <v-btn append-icon="mdi-menu-down" variant="text" :ripple="false">
        {{ usuario.username }}
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in dotsMenuItems.filter(item => item.visible !== false)"
              :key="index"
              :value="index">
              <v-list-item-title @click="item.click">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary>
    <v-list :items="navigationMenuitems"></v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
  import { authStore, uiStore } from '@/main'
  import router from '@/router'
  import { ref } from 'vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'NavigationComponent'
  })
</script>
<script setup lang="ts">
  const usuario = ref(authStore.getUsuarioLogueado)
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
    }
  ])

  const dotsMenuItems = [
    {
      title: 'Perfil',
      click: () => {
        router.push('/perfil')
      }
    },
    {
      title: 'Administración',
      click: () => {
        router.push('/dashboard')
      },
      visible: authStore.getUsuarioLogueado && authStore.getUsuarioLogueado.esAdministrador === true
    },
    {
      title: 'Logout',
      click: () => {
        uiStore.showConfirmDialog({
          props: {
            text: '¿Desea cerrar la sesión?',
            title: 'Confirmación'
          },
          aceptarFn: authStore.logout
        })
      }
    }
  ]
</script>
<style lang="scss" scoped>
  :deep(.v-toolbar__content) {
    justify-content: space-between;
  }

  .left-slot {
    margin-right: 16px;
  }

  .center-slot {
    margin-left: 16px;
    margin-right: 16px;
  }

  .right-slot {
    margin-left: 16px;
  }
</style>
