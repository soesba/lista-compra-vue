<template>
	<detalle-toolbar>
		<template v-slot:left>
			<v-btn icon="mdi-close" @click="onBack" variant="text" color="primary"></v-btn>
		</template>
		<template v-slot:right>
			<v-btn variant="text" color="primary" @click="save()" :disabled="!canSave">Guardar</v-btn>
		</template>
	</detalle-toolbar>
	<div class="form" v-if="editData">
		<div class="body">
			<div class="inputGroup">
				<v-text-field
					variant="underlined"
					label="Fecha*"
					v-model="getFechaCompra"
					append-inner-icon="mdi-calendar"
					@blur="setFechaCompra($event)"
				>
				<v-menu activator="parent" :close-on-content-click="false">
					<v-date-picker 
						color="primary"
						hideHeader
						:first-day-of-week="1" 
						v-model="editData.fechaCompra">
					</v-date-picker>
				</v-menu>
				</v-text-field>
			</div>
			<div class="inputGroup">
				<combo-component
					:tipo-dato="TipoDato.Articulos"
					:model-value="editData.articulo"
					:return-object="true"
					required
					:error-messages="v$.editData.articulo.$errors.map((e) => e.$message)"
					@blur="v$.editData.articulo.$touch"
					@change="onChangeArticulo"
				></combo-component>
			</div>
			<div class="inputGroup">
				<combo-component
					:tipo-dato="TipoDato.Establecimientos"
					:model-value="editData.establecimiento"
					:return-object="true"
					required
					:error-messages="v$.editData.articulo.$errors.map((e) => e.$message)"
					@blur="v$.editData.establecimiento.$touch"
					@change="onChangeEstablecimiento"
				></combo-component>
			</div>
			<div class="inputGroup">
				<v-text-field variant="underlined" label="Marca*" v-model="editData.marca"></v-text-field>
			</div>
			<div class="inputGroup">
				<v-text-field
					ref="inputPrecio"
					variant="underlined"
					type="number"
					label="Precio*"
					v-model.number="editData.precio"
					:hide-spin-buttons="true"
					max-width="120"
					@keypress="onKeypressPrecio"
				></v-text-field>
				<div v-if="editData.articulo">
					<div class="inputGroup">
						<v-text-field
							v-for="unidad in editData.unidadesMedida"
							type="number"
							class="text-capitalize"
							:label="pluralize(unidad.nombre, unidad.valor)"
							variant="underlined"
							:hide-spin-buttons="true"
							v-model="unidad.valor"
							max-width="100"
						></v-text-field>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { DetalleToolbar } from '@/components/index'
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import { useRoute } from 'vue-router'
	import { defineComponent, onMounted, ref, watch } from 'vue'
	import { computed } from 'vue'
	import router from '@/router'
	import getPrecioById from '@/services/precio/getPrecioById.service'
	import create from '@/services/precio/createPrecio.service'
	import update from '@/services/precio/updatePrecio.service'
	import type Precio from '@/services/precio/models/Precio'
	import getArticuloById from '@/services/articulo/getArticuloById.service'
	import type Articulo from '@/services/articulo/models/Articulo'
	import { pluralize } from '@/utils/utils'
	import ComboComponent from '@/components/combos/ComboComponent.vue'
	import { TipoDato } from '@/services/desplegables/models/TipoDato'

	export default defineComponent({
		name: 'PrecioEdicion',
	})
</script>
<script setup lang="ts">
	// Refs
	const fileUpload = ref(null)
	// Computed
	const canSave = computed(() => {
		return !v$.value.editData.$invalid
	})
	const getFechaCompra = computed(() => {
		return editData?.value?.fechaCompra ? new Intl.DateTimeFormat('es-ES', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(editData.value.fechaCompra) : ''
	})
	// Data
	const inputPrecio = ref()
	const adding = ref(false)
	const route = useRoute()
	let editData = ref<any>({
				id: '',
				precio: 0,
				marca: '',
				articulo: null,
				establcimiento: null,
				unidadesMedida: [],
				fechaCreacion: '',
				notas: '',
				borrable: true,
			})

	if (route.params['id']) {
		getPrecioById(route.params['id'].toString()).then((response) => {
			if (response.respuesta === 200) {
				editData.value = response.data as Precio
			}
		})
	} else {
		adding.value = true
	}
		
	// Watch
	watch (
		async () => editData.value?.articulo,
		async (newValue, oldValue) => {
			if (!editData.value?.id) {
				const response = await getArrayUnidadesMedida()
				editData.value!.unidadesMedida = response
			}
		}
	)

	// Validations
	const validations = computed(() => {
		const fechaCompraValid = (value: string) => {
			return value ? new Date(value).getTime() <= new Date().getTime() : false
		}
		return {
			editData: {
				id: { required: requiredIf(!adding.value) },
				articulo: { required },
				marca: { required },
				establecimiento: { required },
				precio: { required },
				fechaCompra: { required, fechaCompraValid },
				borrable: { required }
			}
		}
	})

	// Use the "useVuelidate" function to perform form validation
	const v$ = useVuelidate(validations, { editData })

	onMounted(() => {
		v$.value.editData.articulo.$reset
		v$.value.editData.establecimiento.$reset
	})

	// Methods
	const onKeypressPrecio = (evt) => {
		if (evt.charCode == 46) { 
			evt.preventDefault() 
			evt.target.value = evt.target.value + ','
		}
	}

	const onChangeArticulo = (event) => {
		editData.value!.articulo = event
	}

	const onChangeEstablecimiento = (event) => {
		editData.value!.establecimiento = event
	}

	const getArrayUnidadesMedida = () => {
		return getArticuloById(editData.value!.articulo!.id).then(response => {
			const articulo = response.data as Articulo
			const tmpArray: any = []
			articulo.tiposUnidad.forEach(element => {
				const tmp:any = {...element}
				tmp.valor = null
				tmpArray.push(tmp)
			})
			return tmpArray
		})
	}

	const setFechaCompra = (event: any) => {
		editData.value!.fechaCompra = event.target.value ? new Date(event.target.value.split('/').reverse().join('-')) : null
	}

	const onBack = () => {
		if (adding.value) {
			router.push('/precios')
		} else {
			router.push(`/precios`)
		}
	}

	const save = async () => {
		if (adding.value) {
			createPrecio(editData.value)
			} else {
				updateCompra(editData.value)
		}
	}

	const createPrecio = (data: any) => {
		create(data).then((response) => {
			onBack()
		})
	}

	const updateCompra = (data: any) => {
		update(data).then((response) => {
			onBack()
		})
	}
</script>
<style lang="scss" scoped>
	.wrapper-logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
	}

	.logo {
		width: 150px;
		height: auto;
	}

	.controles-logo {
		display: flex;
		flex-direction: row;
	}

	.input-file {
		height: 0px;
		width: 0px;
		overflow: hidden;
	}
</style>
