<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-close" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
    <template v-slot:center>
			<v-btn variant="text" color="error" @click="confirmDelete()" :disabled="!canDelete">Eliminar</v-btn>
		</template>
		<template v-slot:right>
			<v-btn variant="text" color="primary" @click="save()" :disabled="!canSave">Guardar</v-btn>
		</template>
	</detalle-toolbar>
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
import { defineComponent, ref } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import DetalleToolbar from '@/components/DetalleToolbar.vue'
import EquivalenciaComponent from '@/components/EquivalenciaComponent.vue'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { eventCardStore, uiStore } from '@/main'
import { useRoute } from 'vue-router'
import getById from '@/services/tipoUnidad/getTipoUnidadById.service'
import deleteItem from '@/services/tipoUnidad/deleteTipoUnidad.service'

export default defineComponent({
	name: 'TipoUnidadDetalle',
})
</script>
<script setup lang="ts">

// Computed
const canSave = computed(() => {
	return !v$.value.$invalid
})

const canDelete = computed(() => {
	return editData.value.borrable
})
// Data
const route = useRoute()
const adding = ref(false);
const editData = ref<any>({ borrable: true })
if (route.params['id']) {
	getById(route.params['id'].toString()).then((response) => {
		editData.value = response.data
	})
} else {
	adding.value = true
}

const from = ref({
	id: editData.value.id,
	nombre: editData.value.nombre
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
	editData.value.equivalencias = editData.value.equivalencias.map((item: any) => {
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
	editData.value.equivalencias.push(data)
}

const save = () => {
	eventCardStore.saveCard({ adding: adding.value, data: editData.value })
	uiStore.hideCustomDialog()
}

const confirmDelete = () => {
	uiStore.showConfirmDialog({
		props: {
			text: '¿Desea eliminar el elemento?',
			title: 'Confirmación',
		},
		aceptarFn: deleteRecord,
	})
}

const deleteRecord = () => {
	// eventCardStore.deleteCard(data)
	if (editData.value.borrable) {
		deleteItem(editData.value.id).then(response => {
			if (response.respuesta === 200) {
				onBack()
			}
		})
	}
}

const onBack = () => {
	router.push('/tiposUnidades')
}

</script><style lang="scss" scoped>
</style>
