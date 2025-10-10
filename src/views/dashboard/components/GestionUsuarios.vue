<template>
  <div class="usuarios">
    <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            {{ subtitle }}
          </v-card-text>
        </v-card>
  </div>
</template>

<script setup lang="ts">


const title = 'Usuarios'
const subtitle = 'Gestiona los usuarios de la aplicación'

</script>

<style lang="scss" scoped>
</style>