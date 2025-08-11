<template>
  <edition-toolbar @onSave="save" :saveDisabled="!canSave" />
	<div class="form" v-if="editData">
		<div class="body">
			<div class="inputGroup">
				<v-text-field
						variant="underlined" label="Nombre*" required v-model="editData.nombre"
						:error-messages="v$.editData.nombre.$errors.map(e => e.$message.toString())"
						@blur="v$.editData.nombre.$touch"
						@input="v$.editData.nombre.$touch">
        </v-text-field>
			</div>
			<div class="inputGroup">
				<v-text-field
						variant="underlined" label="Abreviatura*" required v-model="editData.abreviatura"
						:error-messages="v$.editData.abreviatura.$errors.map(e => e.$message.toString())"
						@blur="v$.editData.abreviatura.$touch"
						@input="v$.editData.abreviatura.$touch">
        </v-text-field>
			</div>
      <div class="inputGroup">
        <label class="labelFor">Equivalencias</label>
      </div>
      <div class="inputGroup">
        <label v-if="editData.equivalencias?.length === 0"> No hay equivalencias </label>
      </div>
      <div class="inputGroup margin-top-bottom">
        <label>1 {{editData.nombre}} equivale a </label>
      </div>
      <equivalencia-component
        v-for="equivalencia in editData.equivalencias"
        :equivalencia="equivalencia"
        @update-equivalencia="onUpdateEquivalencia">
      </equivalencia-component>
      <equivalencia-component
        :from="from"
        @save-equivalencia="onSaveEquivalencia" />
			<div class="inputGroup">
				<small class="text-caption text-medium-emphasis">*campo requerido</small>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'TipoUnidadEdicion',
})
</script>
<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import EditionToolbar from '@/components/EditionToolbar.vue'
import EquivalenciaComponent from '@/components/EquivalenciaComponent.vue'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { modelStore } from '@/main'
import create from '@/services/tipoUnidad/createTipoUnidad.service'
import TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
import update from '@/services/tipoUnidad/updateTipoUnidad.service'
// Computed
const canSave = computed(() => {
	return !v$.value.$invalid
})
// Data
const adding = ref(false);
const editData = reactive<any>(modelStore.getTipoUnidad ? modelStore.getTipoUnidad : { borrable: true })
  if (!editData.id) {
	adding.value = true
}

const from = ref({
	id: editData.id,
	nombre: editData.nombre
})
// Validations
const validations = computed(() => {
	return {
		editData: {
			id: { required: requiredIf(!adding.value) },
			nombre: { required },
			abreviatura: { required },
			borrable: { required }
		}
	}
})
// Use the "useVuelidate" function to perform form validation
const v$ = useVuelidate(validations, { editData })

// Methods

const onUpdateEquivalencia = (data: Equivalencia) => {
	console.log("LOG ~ onUpdateEquivalencia ~ data:", data)
	editData.equivalencias = editData.equivalencias.map((item: any) => {
		if ((data.id && item.id === data.id) ||
        (data.tmpId && data.tmpId === item.tmpId)) {
			return data
		} else {
			return item
		}
	})
}

const onSaveEquivalencia = (data: Equivalencia[]) => {
	console.log("LOG ~ onSaveEquivalencia ~ data:", data)
	editData.equivalencias.push(data)
}

const save = () => {
  if (adding.value) {
		createTipoUnidad(editData)
	} else {
		updateTipoUnidad(editData)
	}
}

const createTipoUnidad = (data: TipoUnidad) => {
  create(data).then(response => {
    onBack()
  })
}

const updateTipoUnidad = (data: TipoUnidad) => {
  update(data).then(response => {
    onBack()
  })
}

const onBack = () => {
	router.back()
}

</script><style lang="scss" scoped>
</style>
