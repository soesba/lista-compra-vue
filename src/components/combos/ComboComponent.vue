<template>
	<v-autocomplete
		v-if="autoComplete"
		:return-object="returnObject"
		:variant="variant"
		:label="getLabel()"
		v-model="selected"
		:items="items"
		item-value="id"
		item-title="nombre"
		@blur="onBlur"
		@change="onChange"
	></v-autocomplete>
	<v-select
		v-else
		:return-object="returnObject"
		:variant="variant"
		:label="getLabel()"
		:required="required"
		:multiple="multiple"
		v-model="selected"
		:items="items"
		item-title="nombre"
		item-value="id"
		:error-messages="errorMessage"
		@blur="onBlur"
		@update:modelValue="onChange"
	></v-select>
</template>

<script lang="ts">
	import { defineComponent, ref, type PropType, watch } from 'vue'
	import getDesplegable from '@/services/desplegables/getDesplegable.service'
	import { TipoDato } from '@/services/desplegables/models/TipoDato'

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
		}
	})
	// Data
	let items = await (await getDesplegable(props.tipoDato)).data
	let selected = ref(props.modelValue)
		
	// Watch
	watch (
		() => props.modelValue,
		(newValue, oldValue) => {
			console.log("🚀 ~ newValue, oldValue:", newValue, oldValue)
			selected.value = newValue
		}
	)

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
		
	const onChange = (event) => {
		console.log("LOG ~ onChange ~ emit('change', event):", event)
		emit('change', event)
	}
		
</script>
<style lang="scss" scoped></style>