<template>
  <v-app-bar color="primary" prominent class="app-bar" v-if="$vuetify.display.smAndDown">
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
    <div v-if="$slots.right" class="right-slot">
      <slot name="right" />
    </div>
    <div v-else class="right-slot">
      <v-btn append-icon="mdi-menu-down" variant="text" :ripple="false">
        {{ usuario.username }}
        <v-menu activator="parent">
          <v-list class="dots-menu">
            <v-list-item
              v-for="(item, index) in dotsMenuItems.submenus!.filter(
                item => item.props.visible !== false
              )"
              :key="index"
              :value="index"
              :to="item.props.to">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer
    mobile-breakpoint="sm"
    v-model="drawer"
    :location="$vuetify.display.smAndDown ? 'bottom' : undefined"
    :class="[$vuetify.display.smAndDown ? 'mobile-drawer' : 'rounded-xl']"
    :temporary="isMobileAndDown"
    :persistent="!isMobileAndDown">
    <v-list-item v-if="!isMobileAndDown" title="Precios compra" class="title"></v-list-item>
    <v-list-item v-if="!isMobileAndDown" class="avatar_box">
      <v-avatar class="avatar" :size="100">
        <v-img :src="avatarSrc" :lazy-src="noAvatarUrl" aspect-ratio="1"></v-img>
      </v-avatar>
    </v-list-item>
    <v-list v-model="opened" :nav="!isMobileAndDown" open-strategy="multiple">
      <template
        v-for="item in navigationMenuitems.filter(item => item.props.visible !== false)"
        :key="item.props.value">
        <v-list-group
          :value="item.props.value"
          v-if="item.submenus"
          :title="item.title"
          :prepend-icon="item.props?.prependIcon || ''">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="usuario.username"></v-list-item>
          </template>
          <v-list-item
            v-for="submenu in (item.submenus as Array<any>).filter(
              (sub: any) => sub.props.visible !== false
            )"
            :key="submenu.props.value"
            :title="submenu.title"
            v-bind="submenu.props"
            @click="submenu.click"></v-list-item>
        </v-list-group>
        <v-list-item v-else v-bind="item.props" :title="item.title"></v-list-item>
      </template>
    </v-list>
    <template v-if="!isMobileAndDown" v-slot:append>
      <div class="pa-2">
        <v-list-item
          :key="menuItemLogout?.props.value"
          :title="menuItemLogout?.title"
          v-bind="menuItemLogout?.props"
          @click="menuItemLogout?.click">
        </v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { authStore, noAvatarUrl, uiStore } from '@/main'
  import getUsuarioFoto from '@/services/usuario/getUsuarioFoto.service'
  import { computed, ref, watchEffect } from 'vue'
  import { useDisplay } from 'vuetify'

  const display = useDisplay()

  // Comprobamos si es móvil
  const isMobileAndDown = computed(() => display.smAndDown.value)

  const opened = ref([])
  const usuario = ref(authStore.getUsuarioLogueado)
  const avatarSrc = ref()

  // Traer avatar cuando haya usuario
  watchEffect(async () => {
    if (usuario.value) {
      const avatar = (await getUsuarioFoto({ username: usuario.value.username })).data
      avatarSrc.value = avatar.content || noAvatarUrl
    } else {
      avatarSrc.value = noAvatarUrl
    }
  })

  const drawer = ref(!isMobileAndDown.value)

  const navigationMenuitems = ref([
    {
      title: usuario.value.username,
      click: () => {},
      props: {
        prependIcon: 'mdi-account-circle-outline',
        value: 'usuario',
        visible: computed(() => !isMobileAndDown.value)
      },
      submenus: [
        {
          title: 'Perfil',
          props: {
            to: '/perfil',
            prependIcon: 'mdi-account-circle-outline',
            value: 'perfil'
          }
        },
        {
          title: 'Administración',
          props: {
            to: '/dashboard',
            prependIcon: 'mdi-cog-outline',
            visible:
              authStore.getUsuarioLogueado && authStore.getUsuarioLogueado.esAdministrador === true,
            value: 'administracion'
          }
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
          },
          props: {
            prependIcon: 'mdi-logout',
            value: 'logout',
            visible: computed(() => isMobileAndDown.value)
          }
        }
      ]
    },
    {
      title: 'Articulos',
      props: {
        to: '/articulos',
        link: true,
        prependIcon: 'mdi-cart-outline',
        value: 'articulos'
      }
    },
    {
      title: 'Unidades de medida',
      props: {
        to: '/tiposUnidades',
        link: true,
        prependIcon: 'mdi-ruler',
        value: 'unidades'
      }
    },
    {
      title: 'Categorías de establecimientos',
      props: {
        to: '/tiposEstablecimientos',
        link: true,
        prependIcon: 'mdi-store-cog-outline',
        value: 'categoriasEstablecimientos'
      }
    },
    {
      title: 'Establecimientos',
      props: {
        to: '/establecimientos',
        link: true,
        prependIcon: 'mdi-store',
        value: 'establecimientos'
      }
    },
    {
      title: 'Precios',
      props: {
        to: '/precios',
        link: true,
        prependIcon: 'mdi-currency-eur',
        value: 'precios'
      }
    }
  ])

  const dotsMenuItems = navigationMenuitems.value[0]
  const menuItemLogout = dotsMenuItems.submenus!.find(item => item.props.value === 'logout')
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

  .v-navigation-drawer {
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-on-primary));
  }

  nav:not(.mobile-drawer) {
    height: calc(100% - 20px) !important;
    margin: 10px;
    :deep(.title .v-list-item-title) {
      padding: 10px;
      font-size: 1.5rem;
    }
    :deep(.v-list-group) {
      --list-indent-size: 0px;
    }
  }

  .avatar_box {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }
</style>
