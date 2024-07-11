<template>
  <v-app>
    <navigation />
    <v-main>
      <rawDialog></rawDialog>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Dialog } from '@/components/index'
import { Navigation } from '@/components/index'
import { markRaw } from 'vue';

const rawDialog = markRaw(Dialog)

</script>
