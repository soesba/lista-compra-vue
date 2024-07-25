<template>
	<v-card prepend-icon="mdi-pencil" :title="getTitle">
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						variant="underlined"
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
					<v-text-field variant="underlined" label="Descripción" v-model="editData.descripcion"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<v-select
						variant="underlined"
						label="Unidades de medida (máx 2)*"
						required
						multiple
						v-model="editData.tiposUnidad"
						:items="listaTiposUnidad"
						item-title="nombre"
						item-value="id"
						:error-messages="v$.editData.tiposUnidad.$errors.map((e: any) => e.$message)"
						@update:modelValue="v$.editData.tiposUnidad.$touch"
					></v-select>
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
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import type Articulo from '@/services/articulo/models/Articulo'
	import get from '@/services/tipoUnidad/getTipoUnidad.service'
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
	const canSave = computed(() => {
		return !v$.value.editData.$invalid
	})
	// Data
	const adding = !props.data.id
	let editData = reactive<any>({ ...props.data })
	const listaTiposUnidad = (await get()).data
	console.log('🚀 ~ editData:', editData)
	// Validations
	const validations = computed(() => {
		const maxTiposUnidad = (value: any) => {
			return value.length <= 2
		}
		return {
			editData: {
				id: { required: requiredIf(!adding) },
				nombre: { required },
				descripcion: {},
				tiposUnidad: { required, maxTiposUnidad },
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
