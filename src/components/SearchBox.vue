<template>
  <div class="wrapper-search-box">
    <IconField>
      <InputText class="max-width" placeholder="Buscar" v-model="textoBusqueda"/>
      <InputIcon class="pi pi-search" />
  </IconField>
  </div>
</template>
<script lang="ts">
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
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
