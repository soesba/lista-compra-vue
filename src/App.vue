<template>
  <v-app>
    <navigation />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component>
      <v-container>
        <router-view v-slot="{ Component }">
          <suspense timeout="0">
            <template #default>
              <component :is="Component" :key="$route.path"></component>
            </template>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </suspense>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { Navigation } from '@/components/index'
import { markRaw } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue'
import ConfirmDialog from '@/components/dialogs-system/ConfirmDialog.vue'
import AlertComponent from './components/AlertComponent.vue'

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)

</script>
