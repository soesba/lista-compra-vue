<template>
	<v-card :title="data.nombre" :subtitle="data.abreviatura">
		<v-card-actions>
			<v-btn>Editar</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'TipoUnidadCard'
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
	cardData: {
		type: Object,
		default() {
			return {}
		}
	}
})

const data = ref(props.cardData)

</script>
<style lang="scss" scoped>
</style>