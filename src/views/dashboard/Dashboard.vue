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
      <v-tabs-window-item v-for="i in components.length" :key="i" :value="i">
        <component :is="components[i - 1].name" v-bind="components[i - 1].props" v-on="components[i - 1].events" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import GestionUsuarios from './components/GestionUsuarios.vue'
  import GestionAplicacion from './components/GestionAplicacion.vue'
  import GestionAvatares from './components/GestionAvatares.vue'

  const tabs = ref(1)
  const reload = ref(false)

  const components = [
    {
      name: GestionUsuarios,
      props: { reload: reload.value },
      events: { resetReload: () => reload.value = false }
    },
    {
      name: GestionAplicacion,
      events: { recargaUsuarios: () => reload.value = true }
    },
    {
      name: GestionAvatares,
      events: {}
    }
  ]
</script>
<style lang="scss" scoped></style>
