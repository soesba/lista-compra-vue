<template>
	<v-card prepend-icon="mdi-pencil" :title="getTitle">
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field label="Nombre*" required v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map(e => e.$message)"
						@blur="v$.editData.nombre.$touch"
						@input="v$.editData.nombre.$touch"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<v-text-field label="Abreviatura*" required v-model="editData.abreviatura"
					:error-messages="v$.editData.abreviatura.$errors.map(e => e.$message)"
					@blur="v$.editData.abreviatura.$touch"
					@input="v$.editData.abreviatura.$touch"></v-text-field>
				</v-col>
			</v-row>
			<small class="text-caption text-medium-emphasis">*campo requerido</small>
		</v-card-text>
		<template v-slot:actions>
			<v-btn class="ml-auto" text="Aceptar" @click="save()" :disabled="!canSave"></v-btn>
			<v-btn class="ml-auto" text="Cancelar" @click="cancel()"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
	import { defineComponent, reactive } from 'vue'
	import { computed } from 'vue'
	export default defineComponent({
		name: 'TipoEstablecimientoCardDialog',
	})
</script>
<script setup lang="ts">
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import type TipoEstablecimiento from '@/services/tipoEstablecimiento/models/TipoEstablecimiento'
  import type { PropType } from 'vue'
	import { eventCardStore, uiStore } from '@/main'

		// Props
	const props = defineProps({
    data: {
      type: Object as PropType<TipoEstablecimiento>,
			default() {
				return {}
			}
    },
		adding: {
			type: Boolean,
			default: false
		}
  })
	// Computed 
	const getTitle = computed(() => {
		return props.adding ? 'Nuevo tipo de unidad' : props.data.nombre
	})
	const canSave = computed(() => {
		return !v$.value.$invalid
	})
	// Data
	let editData = reactive<any>({ ...props.data })
	console.log("🚀 ~ editData:", editData)
	// Validations
	const validations = computed(() => {
		return {
			editData: {
				id: { required: requiredIf(!props.adding) },
				nombre: { required },
				abreviatura: { required },
				borrable: { required }
			}
		}
	})
	// Use the "useVuelidate" function to perform form validation
	const v$ = useVuelidate(validations, { editData })
	// Methods
	const cancel = () => {
		eventCardStore.cancelCard()
		uiStore.hideCustomDialog()
	}

	const save = () => {
		console.log("🚀 ~ save ~ editData:", editData)
		eventCardStore.saveCard({ adding: props.adding, data: editData })
		uiStore.hideCustomDialog()
	}
		
</script>
<style lang="scss" scoped></style>
