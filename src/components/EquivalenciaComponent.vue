<template>
	<div>
    <div class="inputGroup">
      <label>1 {{props.from.nombre}} equivale a </label>  
    </div>
    <div v-if="props.equivalencias.length !== 0">
      <div class="inputGroup" v-for="equivalencia in props.equivalencias">
        <v-text-field
          required
          :variant="equivalencia ? 'outlined' : 'underlined'"
          v-model="equivalencia.factor"
          :error-messages="v$.equivalencia.factor.$errors.map((e: any) => e.$message)"
          max-width="100"
        ></v-text-field>
        <combo-component
          :tipo-dato="TipoDato.TipoUnidad"
          :model-value="equivalencia.to"
          required
          :error-messages="v$.equivalencia.to.$errors.map((e) => e.$message)">
        </combo-component>
        <div class="wrapper-icons">  
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="red"
            @click="onClickDelete"
          ></v-btn>
        </div>
      </div>    
    </div>
		<div class="inputGroup">
      <v-text-field
        required
        variant="underlined"
        v-model="nuevaEquivalencia.factor"
        :error-messages="v$.nuevaEquivalencia.factor.$errors.map((e: any) => e.$message)"
        max-width="100"
      ></v-text-field>

      <combo-component
        :tipo-dato="TipoDato.TipoUnidad"
        :model-value="nuevaEquivalencia.to"
        :return-object="true"
        required
        :error-messages="v$.nuevaEquivalencia.to.$errors.map((e) => e.$message)"
        @change="onChangeCboTo">
      </combo-component>   
    </div>
    <div class="inputGroup">
      <div class="wrapper-icons" v-if="nuevaEquivalencia.tmpId">
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
  </div>
</template>
<script lang="ts">
	import useVuelidate from '@vuelidate/core'
	import { required } from 'vuelidate/lib/validators'
	import ComboComponent from './combos/ComboComponent.vue'
	import { computed, defineComponent, Fragment, ref, type PropType } from 'vue'
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
		equivalencias: {
			type: Array<Equivalencia>,
			default: [],
		},
    from: {
      type: Object as PropType<Item>,
			default() {
				return {}
			}
    }
	})
	const nuevaEquivalencia = ref({
    tmpId: Date.now(),
		from: props.from,
		to: null,
		factor: 0,
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
				from: {  required },
        to: {  required },
		    factor: { required }
			}
		}
	})
	const v$ = useVuelidate(validations, { nuevaEquivalencia })
	// Methods
  const onChangeCboTo = (value)=> {
    nuevaEquivalencia.value.to = value
  }

  // const txtEquivalenciaOnBlur = () => {
  //   if (props.equivalencia && nuevaEquivalencia.value.equivalencia !== props.equivalencia.equivalencia) {
  //     emitter('updateEquivalencia', nuevaEquivalencia.value)
  //   }
  //   v$.value.nuevaEquivalencia.equivalencia.$touch
  // }

  // const txtCodPostalOnBlur = () => {
  //   if (props.equivalencia && nuevaEquivalencia.value.codPostal !== props.equivalencia.codPostal) {
  //     emitter('updateEquivalencia', nuevaEquivalencia.value)
  //   }
  // }

  // const txtPoblacionOnBlur = () => {
  //   if (props.equivalencia && nuevaEquivalencia.value.poblacion !== props.equivalencia.poblacion) {
  //     emitter('updateEquivalencia', nuevaEquivalencia.value)
  //   }
  // }

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
			from: props.from,
      to: null,
      factor: 0,
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
