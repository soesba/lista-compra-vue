<template>
  <router-link :to="getRoute" class="no-link">
    <v-card>
      <v-img v-if="logo" class="logo" :src="getImageSrc"></v-img>
      <v-card-title>{{ getTitle }}</v-card-title>
      <v-card-subtitle v-if="showSubtitle">{{ getSubtitle }}</v-card-subtitle>
      <v-card-text class="text-small" v-html="getText"></v-card-text>
    </v-card>
</router-link>
</template>
<script setup lang="ts">
import { noLogoUrl } from '@/main'
import { eventStore } from '@/main'
import { computed, ref } from 'vue'

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

const routes = eventStore.getRoutes

// Computed
const getRoute = computed(() => {
	return `${routes.detail}/${data.value.id}`
})

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

</script>
<style lang="scss" scoped>
.v-card-subtitle {
  min-height: 19.94px;
}
</style>