<template>
	<v-card class="cursor" @click="onClick()">
		<v-img v-if="logo" class="logo" :src="getImageSrc"></v-img>
		<v-card-title>{{ data.title }}</v-card-title>
		<v-card-subtitle>{{ data.subtitle }}</v-card-subtitle>
		<v-card-text class="text-small">{{ data.text }}</v-card-text>
	</v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Card',
})
</script>
<script setup lang="ts">
import { noLogoUrl } from '@/main'
import { computed, ref } from 'vue'

const emit = defineEmits(['click'])

// Props
const props = defineProps({
  logo: {
    type: Boolean,
    default: false,
  },
	cardData: {
		type: Object,
		default() {
			return {}
		}
	},
})
// Data
const data = ref(props.cardData)
// Computed
const getImageSrc = computed(() => {
	return props.cardData.logo ? props.cardData.logo.content : noLogoUrl
})

// Methods
const onClick = () => {
	// TODO
  console.log('Card clicked', data.value.id)
  emit('click', data.value.id)
}
</script>