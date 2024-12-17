<template>
	<div class="title-container">
		<label>{{ titulo }}</label>
		<slot name="menu"></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'TitleView'
})
</script>
<script setup lang="ts">
defineProps({
	titulo: String
})
</script>
<style lang="scss" scoped>
	.title-container {
		padding: 10px;
		text-align: center;
		display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    @media (max-width: 640px) {
      font-size: 1.5rem;
    }
	}
</style>
