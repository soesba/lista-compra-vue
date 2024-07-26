<template>
  <v-app>
    <navigation />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog v-if="rawConfirmDialog"></raw-confirm-dialog>
      <raw-dialog-component v-if="rawDialogComponent"></raw-dialog-component>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ConfirmDialog, DialogComponent, AlertComponent } from '@/components/index'
import { Navigation } from '@/components/index'
import { markRaw, onMounted } from 'vue';
import type ArticuloResponse from './services/articulo/models/ArticuloResponse';
import get from './services/articulo/getArticulo.service';
import { modelStore } from './main';
import type Articulo from './services/articulo/models/Articulo';

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)

onMounted (() => {
  getAllArticulos()
})
// Methods
const getAllArticulos = () => {
  get().then((response: ArticuloResponse) => {
    modelStore.setArticulos(response.data as Articulo[])
  })
}
</script>
