<template>
  <div class="app">
    <navigation />
    <div class="main">
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <DynamicDialog />
      <!-- <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component> -->
      <div class="container">
        <router-view v-slot="{ Component }">
          <suspense timeout="0">
            <template #default>
              <div>
                <component :is="Component" :key="$route.path"></component>
              </div>
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </suspense>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';
import { Navigation } from '@/components/index'
import { markRaw } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import ConfirmDialog from '@/components/dialogs-system/ConfirmDialog.vue'
import AlertComponent from './components/AlertComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)


// Navegar a "/"" al recargar la página
const navigationEntries = performance.getEntriesByType('navigation');
const isReload = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';
if (isReload && window.location.pathname !== '') {
  router.replace('/');
}


</script>
