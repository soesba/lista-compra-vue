<template>
	<v-card prepend-icon="mdi-pencil" :title="data.nombre">
		<v-card-text>
			<v-row dense>
				<v-col cols="12" lg="12" md="4" sm="6">
					<v-text-field label="Nombre*" required v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map(e => e.$message)"
						@blur="v$.editData.nombre.$touch"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" lg="12" md="4" sm="6">
					<v-text-field label="Abreviatura*" required v-model="editData.abreviatura"
					:error-messages="v$.editData.abreviatura.$errors.map(e => e.$message)"
					@blur="v$.editData.abreviatura.$touch"></v-text-field>
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
	import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'
	export default defineComponent({
		name: 'TipoUnidadCardDialog',
	})
</script>
<script setup lang="ts">
	import { required } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import type TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
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
	// Data
	let editData = reactive<any>({ ...props.data })
	console.log("🚀 ~ editData:", editData)
	// Validations
	const validations = computed(() => {
		return {
			editData: {
				id: { required },
				nombre: { required },
				abreviatura: { required },
				borrable: { required }
			}
		}
	})
	// Use the "useVuelidate" function to perform form validation
	const v$ = useVuelidate(validations, { editData })
	// onMounted(() => {
	// 	editData = { ...props.data }
	// })
	// Methods
	const cancelEdit = () => {
		emit('cancelEdit')
	}

	const saveEdit = () => {
		emit('saveEdit', editData)
	}
		
</script>
<style lang="scss" scoped></style>
