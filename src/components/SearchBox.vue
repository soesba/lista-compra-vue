<template>
  <div class="wrapper-search-box">
    <v-text-field
      class="max-width"
      v-model="texto"
      append-inner-icon="mdi-magnify" 
      label="Buscar"
      variant="solo">

    </v-text-field>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
name: 'SearchBox'
})
</script>
<script setup lang="ts">
const texto = ref()
</script>
<style lang="scss" scoped>
.wrapper-search-box {
  display: flex;
  justify-content: center;
}

.max-width {
  max-width: 500px;
}
</style>