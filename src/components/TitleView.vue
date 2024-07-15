<template>
    <div class="title-container">
			<h2>{{  titulo  }}</h2>
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
}
</style>