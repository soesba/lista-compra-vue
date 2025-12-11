<template>
  <component
    :is="autoComplete ? 'v-autocomplete' : 'v-select'"
    v-on="bindEvents"
    v-bind="bindProps"
    :items="items"
    item-value="id"
    item-title="nombre"
    :model-value="selected"
    :label="getLabel()"
    @update:modelValue="onUpdateModelValue"></component>
</template>

<script setup lang="ts">
  import { ref, type PropType, watch, onBeforeMount } from 'vue'
  import getDesplegable from '@/services/desplegables/getDesplegable.service'
  import { TipoDato } from '@/services/desplegables/models/TipoDato'
  import { sort } from '@/utils/utils'
  import type Item from '@/services/desplegables/models/Item'

  const emit = defineEmits(['blur', 'change', 'update:modelValue'])
  // Props
  const props = defineProps({
    modelValue: {
      type: null,
      default: null
    },
    tipoDato: {
      type: String as PropType<TipoDato>,
      default: null,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    autoComplete: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'underlined'
    },
    errorMessage: {
      type: String,
      default: 'Error'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    }
  })
  // Data
  const items = ref()
  const selected = ref(props.modelValue)
  const bindProps = { ...props }
  const bindEvents = {
    blur: () => onBlur(),
    // 'update:modelValue': (event: any) => onUpdateModelValue(event),
    change: (event: any) => onChange(event)
  }

  // Watch
  watch(
    () => props.modelValue,
    newValue => {
      selected.value = newValue
    }
  )

  onBeforeMount(async () => {
    items.value = ((await (await getDesplegable(props.tipoDato)).data) as Item[]).sort(
      sort('nombre')
    )
  })

  // Methods
  const getLabel = () => {
    const label = props.required ? '*' : ''
    if (props.label) return props.label.concat(label)
    switch (props.tipoDato) {
      case TipoDato.Articulos:
        return 'Articulo'.concat(label)
      case TipoDato.Establecimientos:
        return 'Establecimiento'.concat(label)
      case TipoDato.TipoEstablecimientos:
        return 'Categoría'.concat(label)
      case TipoDato.TipoUnidad:
        return 'Unidad'.concat(label)
      case TipoDato.Usuario:
        return 'Usuario'.concat(label)
      case TipoDato.Rol:
        return 'Rol'.concat(label)
    }
  }

  const onBlur = () => {
    emit('blur')
  }

  const onUpdateModelValue = (event: any) => {
    emit('update:modelValue', event)
  }
  const onChange = (event: any) => {
    emit('change', event)
  }
  defineExpose({
    items
  })
</script>
<style lang="scss" scoped></style>
