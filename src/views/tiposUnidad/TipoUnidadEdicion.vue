<template>
  <edition-toolbar @onBack="onBack" @onSave="saveAll" :saveDisabled="!canSave" />
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
        <label v-if="equivalencias?.length === 0"> No hay equivalencias </label>
      </div>
      <div class="inputGroup margin-top-bottom">
        <label>1 {{editData.nombre}} equivale a </label>
      </div>
      <equivalencia-component
        v-for="equivalencia in equivalenciasListado"
        v-bind:key="equivalencia.id || equivalencia.tmpId"
        :equivalencia="equivalencia"
        @update-equivalencia="onUpdateEquivalencia"
        @delete-equivalencia="onDeleteEquivalencia">
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
import { modelStore } from '@/store/instances'
import create from '@/services/tipoUnidad/createTipoUnidad.service'
import update from '@/services/tipoUnidad/updateTipoUnidad.service'
import getByFrom from '@/services/equivalencia/getEquivalenciaByFrom.service'
import save from '@/services/equivalencia/saveEquivalencias.service'
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
const equivalencias = reactive<Equivalencia[]>(await (await(getByFrom(editData.id))).data as Equivalencia[])

const from = ref({
	id: editData.id,
	nombre: editData.nombre
})

// Computed
const equivalenciasListado = computed(() => {
  return equivalencias.filter(eq => eq.markedForDeletion === false)
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
  equivalencias.forEach((eq: Equivalencia, index: number) => {
    if ((data.id && eq.id === data.id) || (data.tmpId && eq.tmpId === data.tmpId)) {
      equivalencias[index] = data
    }
  })
}

const onSaveEquivalencia = (data: Equivalencia) => {
	console.log("LOG ~ onSaveEquivalencia ~ data:", data)
  if (!data.tmpId) {
    data.tmpId = Date.now()
  }
  console.log("LOG ~ onSaveEquivalencia ~ equivalencias:", equivalencias)
	equivalencias.push(data)
}

const onDeleteEquivalencia = (data: Equivalencia) => {
  console.log("LOG ~ onDeleteEquivalencia ~ data:", data)
  if (data.tmpId) {
    equivalencias.splice(equivalencias.findIndex((eq: Equivalencia) => eq.tmpId === data.tmpId, 1))
  } else {
    equivalencias.forEach((eq: Equivalencia, index: number) => {
      if ((data.id && eq.id === data.id) || (data.tmpId && eq.tmpId === data.tmpId)) {
        console.log(index, equivalencias[index])
        equivalencias[index].markedForDeletion = true
      }
    })
  }
  console.log('LOG~ ~ :122 ~ onDeleteEquivalencia ~ equivalencias:', equivalencias)
}

const saveAll = () => {
  equivalencias.forEach((eq: Equivalencia) => {
    delete eq.tmpId
    eq.from = editData.id
  })
  const promesas = []
  if (adding.value) {
    promesas.push(create(editData))
		// createTipoUnidad(editData)
	} else {
    promesas.push(update(editData))
		// updateTipoUnidad(editData)
	}
  promesas.push(save(equivalencias))
  Promise.all(promesas).then((responses) => {
    if (responses && responses[0] && responses[1]) {
      onBack()
    }
  }).catch((error) => {
    console.error("Error al guardar los tipos de unidades y equivalencias:", error)
  })
}

const onBack = () => {
  modelStore.setTipoUnidad(null)
	router.back()
}

</script><style lang="scss" scoped>
</style>
