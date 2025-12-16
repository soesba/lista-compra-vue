<template>
  <div id="bloqueEdicion" v-if="direcciones.length" v-for="(editDireccion, index) in direcciones" :key="editDireccion.id">
		<div class="inputGroup">
			<v-text-field
				label="Dirección*"
				required
        variant="outlined"
				v-model="editDireccion.direccion"
				:error-messages="v$.direcciones.$each.$response.$errors[index].direccion"
				@blur="($event: any) => txtDireccionOnBlur($event, editDireccion)"
			></v-text-field>
      <div class="wrapper-icons">
        <v-btn
          :icon="editDireccion.favorita ? 'mdi-star' : 'mdi-star-outline'"
          variant="text"
          color="primary"
          @click="setFavorita(editDireccion)"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="red"
          @click="onClickDelete"
        ></v-btn>
      </div>
		</div>
		<div class="inputGroup">
			<v-text-field
				type="number"
				label="C.Postal"
        variant="outlined"
				v-model="editDireccion.codPostal"
				:hide-spin-buttons="true"
				max-width="100"
        @blur="($event: any) => txtCodPostalOnBlur($event, editDireccion)"
				@keypress="onCodPostalKeyPress"
			></v-text-field>
			<v-text-field
        label="Población"
        variant="outlined"
        v-model="editDireccion.poblacion"
        @blur="($event: any) => txtPoblacionOnBlur($event, editDireccion)"
      ></v-text-field>
		</div>
	</div>
	<div id="bloqueCreacion">
		<div class="inputGroup">
			<v-text-field
				label="Dirección*"
				required
        variant="underlined"
				v-model="nuevaDireccion.direccion"
				:error-messages="v$.nuevaDireccion.direccion.$errors.map((e: any) => e.$message)"
				@blur="($event: any) => txtDireccionOnBlur($event, nuevaDireccion)"
			></v-text-field>
      <div class="wrapper-icons">
        <v-btn
          icon="mdi-check"
          variant="text"
          color="primary"
          :disabled="!canSave"
          @click="onClickSave"
        ></v-btn>
        <v-btn icon="mdi-close" variant="text" color="primary" @click="onClickCancel"></v-btn>
      </div>
		</div>
		<div class="inputGroup">
			<v-text-field
				type="number"
				label="C.Postal"
        variant="underlined"
				v-model="nuevaDireccion.codPostal"
				:hide-spin-buttons="true"
				max-width="100"
        @blur="($event: any) => txtCodPostalOnBlur($event, nuevaDireccion)"
				@keypress="onCodPostalKeyPress"
			></v-text-field>
			<v-text-field
        label="Población"
        variant="underlined"
        v-model="nuevaDireccion.poblacion"
        @blur="($event: any) => txtPoblacionOnBlur($event, nuevaDireccion)"
      ></v-text-field>
		</div>
	</div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import type { PropType } from 'vue'
import { computed, reactive, ref } from 'vue'
import type Direccion from '@/services/establecimiento/models/Direccion'

const emitter = defineEmits(['createDireccion', 'updateDireccion', 'deleteDireccion'])
const props = defineProps({
	direcciones: {
		type: Array as PropType<Array<Direccion>>,
		default: null,
	},
})

const nuevaDireccion = ref({
	tmpId: 0,
	direccion: '',
	codPostal: '',
	poblacion: '',
	favorita: false,
})

// Computed
const canSave = computed(() => {
	return !v$.value.$invalid
})
// Validations
const validations = computed(() => {
	return {
		nuevaDireccion: {
			direccion: { required },
			codPostal: {},
			poblacion: {},
		},
    direcciones: {
     $each: helpers.forEach({
        direccion: { required },
        codPostal: {},
        poblacion: {},
      })
    }
	}
})
const v$ = useVuelidate(validations, { nuevaDireccion, direcciones: props.direcciones } )
// Methods
const setFavorita = (data: any) => {
	data.favorita = !data.favorita
	emitter('updateDireccion', data)
}

const onCodPostalKeyPress = (evt: any) => {
	if (evt.target.value.length === 5) evt.preventDefault()
}

const txtDireccionOnBlur = (event: any, data: any) => {
  if (data.tmpId || data.id) {
    emitter('updateDireccion', data)
  }
}

const txtCodPostalOnBlur = (event: any, data: any) => {
  if (data.tmpId || data.id) {
    emitter('updateDireccion', data)
  }
}

const txtPoblacionOnBlur = (event: any, data: any) => {
  if (data.tmpId || data.id) {
    emitter('updateDireccion', data)
  }
}

const onClickSave = () => {
  nuevaDireccion.value.tmpId = Date.now()
	emitter('createDireccion', { ...nuevaDireccion.value})
	resetForm()
}

const onClickCancel = () => {
	resetForm()
}

const onClickDelete = () => {
	emitter('deleteDireccion', nuevaDireccion.value)
}

const resetForm = () => {
	nuevaDireccion.value = {
		tmpId: 0,
		direccion: '',
		codPostal: '',
		poblacion: '',
		favorita: false,
	}
	v$.value.$reset()
}
</script>
<style lang="scss" scoped>
	#bloqueEdicion {
		display: flex;
    flex-direction: column;
		justify-content: center;
	}
</style>
