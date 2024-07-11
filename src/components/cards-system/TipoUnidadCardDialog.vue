<template>
	<v-card prepend-icon="mdi-pencil" :title="data.nombre">
		<v-card-text>
			<v-row dense>
				<v-col cols="12" lg="12" md="4" sm="6">
					<v-text-field label="Nombre*" required v-model="editData.nombre"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" lg="12" md="4" sm="6">
					<v-text-field label="Abreviatura*" required v-model="editData.abreviatura"></v-text-field>
				</v-col>
			</v-row>
			<small class="text-caption text-medium-emphasis">*campo requerido</small>
		</v-card-text>
		<template v-slot:actions>
			<v-btn class="ml-auto" text="Aceptar" @click="saveEdit()"></v-btn>
			<v-btn class="ml-auto" text="Cancelar" @click="cancelEdit()"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'TipoUnidadCardDialog',
	})
</script>
<script setup lang="ts">
	import type TipoUnidad from '@/services/TipoUnidad/models/TipoUnidad'
	import { ref } from 'vue'
  import type { PropType } from 'vue'
	// Events
	const emit = defineEmits(['cancelEdit', 'saveEdit'])
  // Props
	const props = defineProps({
    data: {
      type: Object as PropType<TipoUnidad>,
			default() {
				return {}
			}
    }
  })
	console.log('🚀 ~ data:', props.data)
	// Data
	const editData = ref({ ...props.data })
	// Methods
	const cancelEdit = () => {
		emit('cancelEdit')
	}

	const saveEdit = () => {
		emit('saveEdit', editData.value)
	}
</script>
<style lang="scss" scoped></style>
