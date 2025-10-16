<template>
  <div class="base-datos">
    <TitleView :titulo="title" :subtitulo="subtitle" :show-menu="false"></TitleView>
    <div class="lista-configuraciones">
      <v-card
          v-for="configuracion in configuraciones"
          :key="configuracion.id"
          class="config-card"
      >
        <v-card-title>{{ configuracion.nombre }}</v-card-title>
        <v-card-subtitle v-if="configuracion.texto">{{ configuracion.texto }}</v-card-subtitle>
        <v-card-text>
          <div v-for="valor in configuracion.valores" :key="valor">{{ valor }}</div>
        </v-card-text>
      </v-card>
  </div>
  </div>
</template>

<script setup lang="ts">
import getConfiguracionesByCategoria from '@/services/configuracion/getConfiguracionesByCategoria.service';
import Configuracion from '@/services/configuracion/models/Configuracion';
import { ref } from 'vue';



const title = 'Gestión de la aplicación'
const subtitle = 'Utilidades para la gestión de la aplicación'

const configuraciones = ref<Configuracion[]>((await getConfiguracionesByCategoria('dots_menu')).data as Configuracion[]);
</script>

<style lang="scss" scoped>
</style>