<template>
 <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        Aplicación para controlar los precios de la compra diaria
      </v-col>
    </v-row>
 </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VTextField } from 'vuetify/components'
export default defineComponent({
  name: 'Home',
  components: {
    VTextField
  },
});
</script>
