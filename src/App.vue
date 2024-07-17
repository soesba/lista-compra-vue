<template>
  <v-app>
    <navigation />
    <v-main>
      <rawConfirmDialog></rawConfirmDialog>
      <rawDialogComponent></rawDialogComponent>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ConfirmDialog, DialogComponent } from '@/components/index'
import { Navigation } from '@/components/index'
import { markRaw } from 'vue';

const rawDialogComponent = markRaw(DialogComponent)
const rawConfirmDialog = markRaw(ConfirmDialog)
</script>
