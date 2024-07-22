<template>
  <v-app>
    <navigation />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component>
      <v-container>
        <router-view v-if="getRouterReady" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ConfirmDialog, DialogComponent, AlertComponent } from '@/components/index'
import { Navigation } from '@/components/index'
import { computed, markRaw, onMounted, ref } from 'vue';
import router from './router';
import { useRoute } from 'vue-router';

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)
const route = useRoute()
const routerReady = ref(false)
const getRouterReady = computed(() => {
  return routerReady
})

onMounted(async () => {
  await router.isReady()
  routerReady.value = true
  console.log('route.path', route.path)
})
</script>
