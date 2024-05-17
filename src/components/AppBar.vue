<template>
  <v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Precios compra</v-app-bar-title>
</v-app-bar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { VAppBar } from 'vuetify/components'

export default defineComponent({
  name: 'AppBar',
  components: {
    VAppBar
  },
  data () {
    return {
      //
    }
  },
})
</script>
