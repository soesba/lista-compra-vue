<template>
  <TitleView :titulo="titulo" />
  <CardList :items="list" component="TipoUnidadCard"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TiposUnidades'
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CardList, TitleView } from '@/components'
const titulo = ref('Tipos de unidades')
const list = ref([{
	id: '0000',
	nombre: 'Kilogramo',
	abreviatura: 'kg',
  borrable: false
}])

</script>