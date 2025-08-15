<template>
  <Card :title="getTitle">
    <template #title>
      <v-icon color="primary" icon="mdi-arrow-left" @click="cancel"></v-icon>
    </template>
    <template #content>
      <v-radio-group v-model="data" @update:model-value="onChange">
        <v-radio v-for="item in items" :label="item.title" :value="item.value"></v-radio>
      </v-radio-group>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import { uiStore } from '@/main'
import { computed, ref } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  value: Number,
  menu: String,
	items: {
    type: Array<any>,
      required: true
  },
  events: {
    type: Object,
    default: () => {}
  }
})
// Computed
const getTitle = computed(() => {
  return props.menu === 'ordenar' ? 'Ordenar por' : 'Ver como'
})

let data = ref(props.value)
// Methods
const onChange = (value: any) => {
	emit('click', props.menu, value)
  uiStore.hideCustomDialog()
}

const cancel = () => {
	uiStore.hideCustomDialog()
}

</script>
<style lang="scss" scoped></style>
