<template>
  <v-app>
    <navigation />
    <v-main>
      <alert-component></alert-component>
      <raw-confirm-dialog></raw-confirm-dialog>
      <raw-dialog-component></raw-dialog-component>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ConfirmDialog, DialogComponent, AlertComponent } from '@/components/index'
import { Navigation } from '@/components/index'
import { markRaw } from 'vue';

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)
</script>
