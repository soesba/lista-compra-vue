<template>
  <div class="dashboard">
    <v-tabs v-model="tabs" color="primary" grow>
      <v-tab :value="1">
        <v-icon icon="mdi-account"></v-icon>
      </v-tab>

      <v-tab :value="2">
        <v-icon icon="mdi-table-cog"></v-icon>
      </v-tab>

      <v-tab :value="3">
        <v-icon icon="mdi-image"></v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabs">
      <v-tabs-window-item
        v-for="i in 3"
        :key="i"
        :value="i"
      >
        <v-card>
          <v-card-title>{{ cards[i - 1].title }}</v-card-title>
          <v-card-text>
            {{ cards[i - 1].text }}
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const tabs = ref(1)
  const cards = ref([
    {
      title: 'Usuarios',
      text: 'Gestiona los usuarios de la aplicación'
    },
    {
      title: ' Base de datos',
      text: 'Utilidades para la base de datos de la aplicación'
    },
    {
      title: 'Avatares',
      text: 'Gestiona los avatares disponibles para los usuarios'
    }
  ])
</script>
<style lang="scss" scoped>

</style>
