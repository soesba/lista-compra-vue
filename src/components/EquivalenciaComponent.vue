<template>
  <div class="inputGroup">
    <combo-component
      :tipo-dato="TipoDato.TipoUnidad"
      :model-value="nuevaEquivalencia.to"
      :variant="props.equivalencia ? 'outlined' : 'underlined'"
      required
      :error-messages="v$.nuevaEquivalencia.to.$errors.map((e) => e.$message)"
      @change="onChangeCboTo">
    </combo-component>
    <v-text-field
      label="Factor*"
      required
      :variant="props.equivalencia ? 'outlined' : 'underlined'"
      v-model="nuevaEquivalencia.factor"
      :error-messages="v$.nuevaEquivalencia.factor.$errors.map((e: any) => e.$message)"
      @blur="txtFactorOnBlur"
      @keypress="txtFactorOnKeyPress"
      @input="v$.nuevaEquivalencia.factor.$touch"
    ></v-text-field>
    <div class="wrapper-icons" v-if="props.equivalencia">
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="red"
        @click="onClickDelete"
      ></v-btn>
    </div>
    <div class="wrapper-icons" v-else>
      <v-btn
        icon="mdi-check"
        variant="text"
        color="primary"
        :disabled="!canSave"
        @click="onClickSave"
      ></v-btn>
      <v-btn
        icon="mdi-close"
        variant="text"
        color="primary"
        @click="onClickCancel">
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import ComboComponent from './combos/ComboComponent.vue'
import { computed, defineComponent, ref, type PropType } from 'vue'
import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
import { TipoDato } from '@/services/desplegables/models/TipoDato'
import type Item from '@/services/desplegables/models/Item'

export default defineComponent({
	name: 'EquivalenciaComponent',
})
</script>
<script setup lang="ts">
const emitter = defineEmits(['saveEquivalencia', 'updateEquivalencia'])
const props = defineProps({
	equivalencia: {
		type: Object as PropType<Equivalencia>,
		default: null,
	},
	from: {
		type: Object as PropType<Item>,
		default() {
			return {}
		}
	}
})

console.log(props.from)
const nuevaEquivalencia = props.equivalencia ? ref({ ...props.equivalencia}) : ref({
	tmpId: Date.now(),
	to: null,
	factor: null,
	borrable: true
})

// Computed
const canSave = computed(() => {
	return !v$.value.$invalid
})
// Validations
const validations = computed(() => {
	return {
		nuevaEquivalencia: {
			to: { required },
			factor: { required }
		}
	}
})
const v$ = useVuelidate(validations, { nuevaEquivalencia })
// Methods
  
const onChangeCboTo = (value: any)=> {
	console.log("LOG ~ onChangeCboTo ~ value:", value)
	nuevaEquivalencia.value.to = value
	if (props.equivalencia && nuevaEquivalencia.value.to !== props.equivalencia.to) {
		emitter('updateEquivalencia', nuevaEquivalencia.value)
	}
	v$.value.nuevaEquivalencia.value.to.$touch()
}

const txtFactorOnBlur = () => {
	if (props.equivalencia && nuevaEquivalencia.value.factor !== props.equivalencia.factor) {
		emitter('updateEquivalencia', nuevaEquivalencia.value)
	}
	v$.value.nuevaEquivalencia.value.factor.$touch
}


const txtFactorOnKeyPress = (evt: any) => {
	console.log("LOG ~ txtFactorOnKeyPress ~ evt:", evt)
}
  
const onClickSave = () => {
	emitter('saveEquivalencia', nuevaEquivalencia.value)
	resetForm()
}

const onClickCancel = () => {
	resetForm()
}

const onClickDelete = () => {

}

const resetForm = () => {
	nuevaEquivalencia.value = {
		tmpId: 0,
		to: null,
		factor: null,
		borrable: true
	}
	v$.value.$reset()
}
</script>
<style lang="scss" scoped>
	#contenedor {
		display: flex;
    flex-direction: column;
		justify-content: center;
	}

  .wrapper-icons {
    display: flex;
    justify-content: flex-end;
  }

  .inputGroup {
    flex-basis: 100%;
  }
</style>
