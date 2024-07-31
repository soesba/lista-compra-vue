<template>
	<v-card prepend-icon="mdi-pencil" :title="getTitle" width="340" class="screen-center">
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						variant="underlined" label="Nombre*" required v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map(e => e.$message)"
						@blur="v$.editData.nombre.$touch"
						@input="v$.editData.nombre.$touch"></v-text-field>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<v-text-field
						variant="underlined" label="Abreviatura*" required v-model="editData.abreviatura"
						:error-messages="v$.editData.abreviatura.$errors.map(e => e.$message)"
						@blur="v$.editData.abreviatura.$touch"
						@input="v$.editData.abreviatura.$touch"></v-text-field>
				</v-col>
			</v-row>
			<!-- <v-row dense>
				<v-col cols="12">
					<label>Equivalencias</label>
					<div class="wrapper-equivalencias">
          <v-btn v-for="tipoUnidad in listaTiposUnidad" :key="tipoUnidad.id">
            {{ tipoUnidad.nombre }}
          </v-btn>
        </div>
				</v-col>
			</v-row> -->
			<small class="text-caption text-medium-emphasis">*campo requerido</small>
		</v-card-text>
		<template v-slot:actions>
			<v-btn class="ml-auto" text="Aceptar" @click="save()" :disabled="!canSave"></v-btn>
			<v-btn class="ml-auto" text="Cancelar" @click="cancel()"></v-btn>
		</template>
	</v-card>
</template>

<script lang="ts">
	import { defineComponent, onMounted, reactive, ref } from 'vue'
	import { computed } from 'vue'
import get from '@/services/tipoUnidad/getTipoUnidad.service'
	export default defineComponent({
		name: 'TipoUnidadCardDialog',
	})
</script>
<script setup lang="ts">
	import { required, requiredIf } from 'vuelidate/lib/validators'
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
	const equivalencias = ref([])
	let editData = reactive<any>({ ...props.data })
	let listaTiposUnidad = ref<TipoUnidad[]>([])
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
	onMounted(() => {
		get().then(response => {
			if (props.data.id) {
				listaTiposUnidad.value = (response.data as TipoUnidad[]).filter(item => item.id !== props.data.id)
			} else {
				listaTiposUnidad.value = response.data as TipoUnidad[]
			}
		})
	})
	// Methods

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
