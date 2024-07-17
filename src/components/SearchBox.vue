<template>
  <div class="wrapper-search-box">
    <v-text-field
      class="max-width"
      append-inner-icon="mdi-magnify" 
      label="Buscar"
      variant="solo"
      v-model="textoBusqueda">

    </v-text-field>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
name: 'SearchBox'
})
</script>
<script setup lang="ts">
const emit = defineEmits(['search'])
const textoBusqueda = ref()
let timeoutSearchId = 0

watch(textoBusqueda, (newValue) => {
  clearTimeout(timeoutSearchId)
  timeoutSearchId = window.setTimeout(() => {
    emit('search', newValue)
  }, 500)
})
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