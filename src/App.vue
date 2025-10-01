<template>
  <v-app>
    <navigation v-if="showNavigation" />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component>
      <v-container :class="{ login: !showNavigation }" fluid>
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
import { computed, markRaw } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import ConfirmDialog from '@/components/dialogs-system/ConfirmDialog.vue'
import AlertComponent from './components/AlertComponent.vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/main'

const router = useRouter()

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)

const showNavigation = computed(() => {
  return authStore?.isAuthenticated || false
})

// Navegar a "/"" al recargar la página
const navigationEntries = performance.getEntriesByType('navigation');
const isReload = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';
if (isReload && window.location.pathname !== '') {
  router.replace('/');
}


</script>
