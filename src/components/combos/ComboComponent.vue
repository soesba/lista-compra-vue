<template>
	<component :is="autoComplete ? 'v-autocomplete' : 'v-select'"
		v-on="bindEvents"
		v-bind="bindProps"
		:items="items"
		item-value="id"
		item-title="nombre"
		:model-value="selected"
		:label="getLabel()"></component>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch, onBeforeMount, defineExpose } from 'vue'
import getDesplegable from '@/services/desplegables/getDesplegable.service'
import { TipoDato } from '@/services/desplegables/models/TipoDato'
import { sort } from '@/utils/utils';
import type Item from '@/services/desplegables/models/Item';

export default defineComponent({
	name: 'ComboComponent',
})
</script>
<script setup lang="ts">
const emit= defineEmits(["blur", 'change'])
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
	label:{
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
		default: false
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
const eventNameChange = !props.autoComplete ? 'update:modelValue' : 'change'
const bindProps = { ...props }
const bindEvents = {
	blur: () => onBlur(),
	[eventNameChange]: (event: any) => onChange(event)
}

// Watch
watch (
	() => props.modelValue,
	(newValue) => {
		selected.value = newValue
	}
)

onBeforeMount(async () => {
	items.value = (await (await getDesplegable(props.tipoDato)).data as Item[]).sort(sort('nombre'))
})

// Methods
const getLabel = () => {
	const label = props.required ? '*': ''
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
	}
}

const onBlur = () => {
	console.log("LOG ~ onBlur ~ emit('blur'):")
	emit('blur')
}

const onChange = (event: any) => {
	console.log("LOG ~ onChange ~ emit('change', event):", event)
	emit('change', event)
}
defineExpose({
	items
})
</script>
<style lang="scss" scoped></style>
