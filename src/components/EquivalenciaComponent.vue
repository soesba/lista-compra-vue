<template>
  <div class="inputGroup">
    <combo-component
      :tipo-dato="TipoDato.TipoUnidad"
      :model-value="nuevaEquivalencia.to"
      :variant="props.equivalencia ? 'outlined' : 'underlined'"
      :return-object="false"
      required
      :error-messages="v$.nuevaEquivalencia.to.$errors.map(e => e.$message)"
      @change="onChangeCboTo">
    </combo-component>
    <v-text-field
      label="Factor*"
      required
      :variant="props.equivalencia ? 'outlined' : 'underlined'"
      step="any"
      type="number"
      v-model="nuevaEquivalencia.factor"
      :error-messages="v$.nuevaEquivalencia.factor.$errors.map((e: any) => e.$message)"
      @blur="txtFactorOnBlur"
      @input="v$.nuevaEquivalencia.factor.$touch"></v-text-field>
    <div class="wrapper-icons" v-if="props.equivalencia">
      <v-btn icon="mdi-delete" variant="text" color="red" @click="onClickDelete"></v-btn>
    </div>
    <div class="wrapper-icons" v-else>
      <v-btn
        icon="mdi-check"
        variant="text"
        color="primary"
        :disabled="!canSave"
        @click="onClickSave"></v-btn>
      <v-btn icon="mdi-close" variant="text" color="primary" @click="onClickCancel"> </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVuelidate from '@vuelidate/core'
  import ComboComponent from './combos/ComboComponent.vue'
  import { computed, ref, type PropType } from 'vue'
  import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
  import { TipoDato } from '@/services/desplegables/models/TipoDato'
  import type Item from '@/services/desplegables/models/Item'
  import { requiredIf } from '@vuelidate/validators'

  const emitter = defineEmits(['saveEquivalencia', 'updateEquivalencia', 'deleteEquivalencia'])
  const props = defineProps({
    equivalencia: {
      type: Object as PropType<Equivalencia>,
      default: null
    },
    from: {
      type: Object as PropType<Item>,
      default() {
        return {}
      }
    }
  })

  const nuevaEquivalencia = props.equivalencia
    ? ref({ ...props.equivalencia })
    : ref({
        tmpId: 0,
        from: props.from,
        to: null,
        factor: null
      })

  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })
  // Validations
  const validations = computed(() => {
    return {
      nuevaEquivalencia: {
        from: { required: requiredIf(props.equivalencia !== null) },
        tmpId: { required: requiredIf(!props.equivalencia) },
        to: { required: requiredIf(props.equivalencia !== null) },
        factor: { required: requiredIf(props.equivalencia !== null) }
      }
    }
  })
  const v$ = useVuelidate(validations, { nuevaEquivalencia })
  // Methods

  const onChangeCboTo = (value: any) => {
    nuevaEquivalencia.value.to = value
    if (props.equivalencia && nuevaEquivalencia.value.to !== props.equivalencia.to) {
      emitter('updateEquivalencia', nuevaEquivalencia.value)
    }
    v$.value.nuevaEquivalencia.to.$touch()
  }

  const txtFactorOnBlur = (value: any) => {
    const numberValue = value.target.valueAsNumber
    if (props.equivalencia && numberValue !== props.equivalencia.factor) {
      nuevaEquivalencia.value.factor = numberValue
      emitter('updateEquivalencia', nuevaEquivalencia.value)
    }
    v$.value.nuevaEquivalencia.factor.$touch
  }

  const onClickSave = () => {
    emitter('saveEquivalencia', nuevaEquivalencia.value)
    resetForm()
  }

  const onClickCancel = () => {
    resetForm()
  }

  const onClickDelete = () => {
    emitter('deleteEquivalencia', nuevaEquivalencia.value)
  }

  const resetForm = () => {
    nuevaEquivalencia.value = {
      tmpId: 0,
      from: props.from,
      to: null,
      factor: null
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
