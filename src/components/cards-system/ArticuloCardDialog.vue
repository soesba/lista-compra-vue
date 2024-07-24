<template>
	<v-card prepend-icon="mdi-pencil" :title="getTitle">
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						label="Nombre*"
						required
						v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map((e) => e.$message)"
						@blur="v$.editData.nombre.$touch"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<v-text-field label="Descripción" v-model="editData.descripcion"></v-text-field>
				</v-col>
			</v-row>
			<small class="text-caption text-medium-emphasis">*campo requerido</small>
		</v-card-text>
		<template v-slot:actions>
			<v-btn class="ml-auto" text="Aceptar" @click="save()"></v-btn>
			<v-btn class="ml-auto" text="Cancelar" @click="cancel()"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref } from 'vue'
	import { computed } from 'vue'
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import type Articulo from '@/services/articulo/models/Articulo'
	import type { PropType } from 'vue'
	import { eventCardStore, uiStore } from '@/main'
	export default defineComponent({
		name: 'ArticuloCardDialog',
	})
</script>
<script setup lang="ts">
	// Props
	const props = defineProps({
		data: {
			type: Object as PropType<Articulo>,
			default() {
				return {}
			},
		}
	})
	// Computed
	const getTitle = computed(() => {
		return adding ? 'Nuevo artículo' : props.data.nombre
	})
	// Data
	const adding = !props.data.id
	let editData = reactive<any>({ ...props.data })
	console.log('🚀 ~ editData:', editData)
	// Validations
	const validations = computed(() => {
		return {
			editData: {
				id: { required: requiredIf(!adding) },
				nombre: { required },
				descripcion: {},
				borrable: { required },
			},
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
		console.log('🚀 ~ save ~ editData:', editData)
		eventCardStore.saveCard({ adding: adding, data: editData })
		uiStore.hideCustomDialog()
	}
</script>
<style lang="scss" scoped></style>
