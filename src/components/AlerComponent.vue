<template>
  <v-alert v-if="show" closable :text="text" :variant="variant" :type="type"></v-alert>
</template>
<script lang="ts">
import { uiStore } from '@/main';
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
name: 'AlertComponent'
})
</script>
<script setup lang="ts">
	// Computed
  const alert = computed(() => {
    return uiStore.getAlerComponent
  })
	const show = computed(() => {
		return uiStore.getAlerComponent?.show
	})
  // Data
  const text = ref(alert.value.props.text)
  const type = ref(alert.value.props.type) || 'success'
  const variant = ref(alert.value.props.variant) || 'tonal'
</script>
<style lang="scss" scoped>
</style>