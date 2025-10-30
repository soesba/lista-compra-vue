<template>
  <v-app>
    <Mask></Mask>
    <navigation v-if="userLogged" />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component>
      <v-container :class="{ login: !userLogged, mobile: $vuetify.display.smAndDown }">
        <router-view v-slot="{ Component }">
          <Suspense timeout="0">
            <template #default>
              <div>
                <component :is="Component" :key="$route.path"></component>
              </div>
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
  import { default as Navigation } from '@/components/Navigation.vue'
  import { default as Mask } from '@/components/Mask.vue'
  import { ref, markRaw, watch } from 'vue'
  import DialogComponent from '@/components/DialogComponent.vue'
  import ConfirmDialog from '@/components/dialogs-system/ConfirmDialog.vue'
  import AlertComponent from './components/AlertComponent.vue'
  import { authStore } from './main'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const emmiter = defineEmits(['login', 'logout'])
  const rawDialogComponent = markRaw(DialogComponent)
  const rawConfirmDialog = markRaw(ConfirmDialog)
  const userLogged = ref(authStore.isAuthenticated)

  watch(router.currentRoute, newValue => {
    if (newValue.fullPath === '/login') {
      userLogged.value = false
    } else {
      userLogged.value = authStore.isAuthenticated
      // const preferencias = authStore.getPreferencias
      // console.log('LOG~ ~ :48 ~ Guardamos preferencias:', preferencias)
      // authStore.setPreferencias(preferencias)
    }
  })

  // Navegar a "/"" al recargar la página
  const navigationEntries = performance.getEntriesByType('navigation')
  const isReload =
    navigationEntries.length > 0 &&
    (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload'
  if (isReload && window.location.pathname !== '') {
    console.log('Recarga de página detectada, navegando a "/"')
    const preferencias = authStore.getUsuarioLogueado.preferencias
    authStore.setPreferencias(preferencias)
    router.replace('/')
  }
</script>
