<template>
  <v-app>
    <Mask></Mask>
    <navigation v-if="userLogged" @logout="onLogout" />
    <v-main>
      <alert-component></alert-component>
      <raw-action-dialog v-if="rawActionDialog"></raw-action-dialog>
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
  import { ref, markRaw, watch, onMounted } from 'vue'
  import DialogComponent from '@/components/DialogComponent.vue'
  import ActionDialog from '@/components/dialogs-system/ActionDialog.vue'
  import AlertComponent from './components/AlertComponent.vue'
  import { authStore, uiStore } from './main'
  import { useRouter } from 'vue-router'
import getModelos from './services/modelo/getModelos.service'

  const router = useRouter()
  const emmiter = defineEmits(['login'])
  const rawDialogComponent = markRaw(DialogComponent)
  const rawActionDialog = markRaw(ActionDialog)
  const userLogged = ref(authStore.isAuthenticated)

  watch(router.currentRoute, async newValue => {
    if (newValue.fullPath === '/login') {
      userLogged.value = false
    } else {
      userLogged.value = authStore.isAuthenticated
      const modelos = (await getModelos()).data as Array<any>
      uiStore.setModelos(modelos)
    }
  })

  // Navegar a "/"" al recargar la página
  const navigationEntries = performance.getEntriesByType('navigation')
  const isReload = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload'
  if (isReload && window.location.pathname !== '' && authStore.getUsuarioLogueado) {
    console.log('Recarga de página detectada, navegando a "/"')
    const preferencias = authStore.getUsuarioLogueado.preferencias
    authStore.setPreferencias(preferencias)

    router.replace('/')
  }

  const onLogout = () => {
    authStore.logout()
    router.push('/login')
  }
</script>
