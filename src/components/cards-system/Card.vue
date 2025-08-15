<template>
	<Card class="cursor" @click="onClick()">
     <template #header>
      <Image v-if="logo" class="logo" :src="getImageSrc"></Image>
    </template>
    <template #title>
      <div class="card-title">{{ getTitle }}</div>
    </template>
    <template #subtitle>
		  <div class="card-subtitle" v-if="showSubtitle">{{ getSubtitle }}</div>
    </template>
    <template #content>
		  <div class="card-text text-small">{{ getText }}</div>
    </template>
	</Card>
</template>
<script lang="ts">

import Image from 'primevue/image';
import Card from 'primevue/card';
import { defineComponent } from 'vue'
import { noLogoUrl } from '@/main'
import { computed, ref } from 'vue'

export default defineComponent({
	name: 'Card',
})
</script>
<script setup lang="ts">

const emit = defineEmits(['click'])

// Props
const props = defineProps({
  // Establece si la card tendrá logo o no
  logo: {
    type: Boolean,
    default: false,
  },
  // Datos de la card
	cardData: {
		type: Object,
		default() {
			return {}
		}
	},
  // Mapeo de los datos
  // Se utiliza para mapear los datos de la card a los campos que se van a mostrar
  mapping: {
    type: Object,
    default: () => ({}),
  }
})
// Data
const data = ref(props.cardData)
// Computed
const getImageSrc = computed(() => {
	return props.cardData[props.mapping.logo] ? props.cardData[props.mapping.logo].content : noLogoUrl
})
const showSubtitle = computed(() => {
  return props.mapping.subtitle !== undefined
})
const getTitle = computed(() => {
  if (typeof props.mapping.title === 'string') {
    return props.cardData[props.mapping.title]
  } else if (typeof props.mapping.title === 'function') {
    return props.mapping.title(props.cardData)
  }
})
const getSubtitle = computed(() => {
  if (typeof props.mapping.subtitle === 'string') {
	  return props.cardData[props.mapping.subtitle]
  } else if (typeof props.mapping.subtitle === 'function') {
    return props.mapping.subtitle(props.cardData)
  }
})
const getText = computed(() => {
  if (typeof props.mapping.text === 'string') {
    return props.cardData[props.mapping.text]
  } else if (typeof props.mapping.text === 'function') {
    return props.mapping.text(props.cardData)
  }
})

// Methods
const onClick = () => {
  emit('click', data.value.id)
}
</script>
<style lang="scss" scoped>
.p-card-subtitle {
  min-height: 19.94px;
}
</style>