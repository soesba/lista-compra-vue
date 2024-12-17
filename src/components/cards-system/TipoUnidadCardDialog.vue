<template>
	<v-card prepend-icon="mdi-pencil" :title="getTitle" width="400" class="screen-center">
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						variant="underlined" label="Nombre*" required v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map(e => e.$message.toString())"
						@blur="v$.editData.nombre.$touch"
						@input="v$.editData.nombre.$touch"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						variant="underlined" label="Abreviatura*" required v-model="editData.abreviatura"
						:error-messages="v$.editData.abreviatura.$errors.map(e => e.$message.toString())"
						@blur="v$.editData.abreviatura.$touch"
						@input="v$.editData.abreviatura.$touch"></v-text-field>
				</v-col>
			</v-row>
			<div v-if="editData.nombre">
				<v-row dense>
					<v-col cols="12">
						<div class="inputGroup">
							<label class="labelFor">Equivalencias</label>
						</div>
						<div class="inputGroup">
							<label v-if="editData.equivalencias?.length === 0"> No hay equivalencias </label>
						</div>
					</v-col>
				</v-row>
				<v-row dense>
					<v-col cols="12">
						<div class="inputGroup">
							<label>1 {{editData.nombre}} equivale a </label>  
						</div>
					</v-col>
				</v-row>
				<v-row dense>
					<v-col cols="12">
						<equivalencia-component
							v-for="equivalencia in editData.equivalencias"
							:equivalencia="equivalencia"
							@update-equivalencia="onUpdateEquivalencia">
						</equivalencia-component>
						<equivalencia-component
							:from="from"
							@save-equivalencia="onSaveEquivalencia" />
					</v-col>
				</v-row>
			</div>
			<small class="text-caption text-medium-emphasis">*campo requerido</small>
		</v-card-text>
		<template v-slot:actions>
			<v-btn class="ml-auto" text="Aceptar" @click="save()" :disabled="!canSave"></v-btn>
			<v-btn class="ml-auto" text="Cancelar" @click="cancel()"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'
import EquivalenciaComponent from '../EquivalenciaComponent.vue'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
export default defineComponent({
	name: 'TipoUnidadCardDialog',
})
</script>
<script setup lang="ts">
import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
import type { PropType } from 'vue'
import { eventCardStore, uiStore } from '@/main'

// Props
const props = defineProps({
	data: {
		type: Object as PropType<TipoUnidad>,
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
const editData = ref<any>({ ...props.data })
	
const from = ref({
	id: editData.value.id,
	nombre: editData.value.nombre
})
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
const v$ = useVuelidate(validations, editData)

// Methods

const onUpdateEquivalencia = (data: Equivalencia) => {
	console.log("LOG ~ onUpdateEquivalencia ~ data:", data)
	editData.value.equivalencias = editData.value.equivalencias.map((item: any) => {      
		if ((data.id && item.id === data.id) ||
        (data.tmpId && data.tmpId === item.tmpId)) {
			return data
		} else {
			return item
		}
	})
}
	
const onSaveEquivalencia = (data: Equivalencia) => {
	console.log("LOG ~ onSaveEquivalencia ~ data:", data)
	editData.value.equivalencias.push(data)
}

const cancel = () => {
	eventCardStore.cancelCard()
	uiStore.hideCustomDialog()
}

const save = () => {
	eventCardStore.saveCard({ adding: props.adding, data: editData })
	uiStore.hideCustomDialog()
}
		
</script>
<style lang="scss" scoped></style>
