<template>
  <div class="avatares">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ subtitle }}
      </v-card-text>
      <v-card-subtitle v-if="avatares.length === 0">
        No hay avatares disponibles
      </v-card-subtitle>
    </v-card>
  </div>
  <div class="wrapper-add-button">
    <v-fab
      icon="mdi-plus"
      class="ms-4"
      location="bottom end"
      absolute
      offset
      color="primary"
      @click="addAvatar()"
    ></v-fab>
  </div>
</template>

<script setup lang="ts">
import get from '@/services/avatar/getAvatares.service'
import Avatar from '@/services/avatar/models/Avatar'
import { ref } from 'vue'


const title = 'Avatares'
const subtitle = 'Gestiona los avatares disponibles para los usuarios'
const avatares = ref<Avatar[]>((await get()).data as Avatar[])

const addAvatar = () => {
  console.log('Add avatar')
}

</script>

<style lang="scss" scoped>
.wrapper-add-button {
  position: fixed;
  width: 100%;
  bottom: 40px;
  right: 20px;
}
</style>