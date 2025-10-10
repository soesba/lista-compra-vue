<template>
  <div class="base-datos">
    <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            {{ subtitle }}
          </v-card-text>
        </v-card>
  </div>
</template>

<script setup lang="ts">


const title = 'Base de datos'
const subtitle = 'Utilidades para la base de datos de la aplicación'

</script>

<style lang="scss" scoped>
</style>