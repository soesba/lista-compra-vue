<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppBar } from '@/components/index'

export default defineComponent({
  name: 'App',
  components: {
    AppBar
  },
  data () {
    return {
      //
    }
  },
})
</script>
