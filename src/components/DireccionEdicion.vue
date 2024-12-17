<template>
	<div id="bloqueEdicion">
		<div class="inputGroup">
			<v-text-field
				label="Dirección*"
				required
        :variant="props.direccion ? 'outlined' : 'underlined'"
				v-model="nuevaDireccion.direccion"
				:error-messages="v$.nuevaDireccion.direccion.$errors.map((e: any) => e.$message)"
				@blur="txtDireccionOnBlur"
				@input="v$.nuevaDireccion.direccion.$touch"
			></v-text-field>
      <div class="wrapper-icons" v-if="props.direccion">
        <v-btn
          :icon="nuevaDireccion.favorita ? 'mdi-star' : 'mdi-star-outline'"
          variant="text"
          color="primary"
          @click="setFavorita"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="red"
          @click="onClickDelete"
        ></v-btn>
      </div>
      <div class="wrapper-icons" v-if="!props.direccion">
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
        :variant="props.direccion ? 'outlined' : 'underlined'"
				v-model="nuevaDireccion.codPostal"
				:hide-spin-buttons="true"
				max-width="100"
        @blur="txtCodPostalOnBlur"
				@keypress="onCodPostalKeyPress"
			></v-text-field>
			<v-text-field
        label="Población"
        :variant="props.direccion ? 'outlined' : 'underlined'"
        v-model="nuevaDireccion.poblacion"
        @blur="txtPoblacionOnBlur"
      ></v-text-field>
		</div>
	</div>
</template>
<script lang="ts">
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { PropType } from 'vue'
import { computed, defineComponent, reactive } from 'vue'
import type Direccion from '@/services/establecimiento/models/Direccion'
export default defineComponent({
	name: 'DireccionEdicion',
})
</script>
<script setup lang="ts">
const emitter = defineEmits(['saveDireccion', 'updateDireccion', 'deleteDireccion'])
const props = defineProps({
	direccion: {
		type: Object as PropType<Direccion>,
		default: null,
	},
})

const nuevaDireccion = props.direccion ? reactive<any>({ ...props.direccion }) : reactive({
	tmpId: Date.now(),
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
	}
})
const v$ = useVuelidate(validations, nuevaDireccion )
// Methods
const setFavorita = () => {
	nuevaDireccion.value.favorita = !nuevaDireccion.value.favorita
	emitter('updateDireccion', nuevaDireccion.value)
}

const onCodPostalKeyPress = (evt: any) => {
	if (evt.target.value.length === 5) evt.preventDefault()
}

const txtDireccionOnBlur = () => {
	if (props.direccion && nuevaDireccion.value.direccion !== props.direccion.direccion) {
		emitter('updateDireccion', nuevaDireccion.value)
	}
	v$.value.nuevaDireccion.direccion.$touch
}

const txtCodPostalOnBlur = () => {
	if (props.direccion && nuevaDireccion.value.codPostal !== props.direccion.codPostal) {
		emitter('updateDireccion', nuevaDireccion.value)
	}
}

const txtPoblacionOnBlur = () => {
	if (props.direccion && nuevaDireccion.value.poblacion !== props.direccion.poblacion) {
		emitter('updateDireccion', nuevaDireccion.value)
	}
}

const onClickSave = () => {
	emitter('saveDireccion', nuevaDireccion.value)
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
