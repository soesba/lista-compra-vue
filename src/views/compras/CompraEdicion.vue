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
          type="date"
					label="Fecha*"
          max-width="180"
					required
					v-model="editData.fechaCompra"
					:error-messages="v$.editData.fechaCompra.$errors.map((e: any) => e.$message)"
					@blur="v$.editData.fechaCompra.$touch"
					@input="v$.editData.fechaCompra.$touch"
				></v-text-field>
        <v-text-field
          variant="underlined"
					label="Factura/Ticket"
					required
					v-model="editData.factura"
				></v-text-field>
			</div>
			<div class="inputGroup">
				<v-autocomplete 
          variant="underlined"
          label="Establecimiento*"
          :return-object="true"
          v-model="editData.establecimiento"
          :items="listaEstablecimientos"
          item-id="id"
          item-title="nombre"></v-autocomplete>
			</div>
      <div class="inputGroup">
				<label class="labelFor">Artículos</label>
        <label v-if="!mostrarArticulos"> No hay articulos </label>
			</div>
      <articulos-compra @update-articulo="onUpdateArticulo" v-for="articulo in editData.articulos" :articulo="articulo"></articulos-compra>      
			<articulos-compra @save-articulo="onSaveArticulo"></articulos-compra>
		</div>
	</div>
</template>

<script lang="ts">
	import DetalleToolbar from '@/components/DetalleToolbar.vue'
  import ArticulosCompra from '@/components/ArticulosCompra.vue'
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import { useRoute } from 'vue-router'
	import { defineComponent, reactive, ref } from 'vue'
	import { computed } from 'vue'
	import router from '@/router'
	import getById from '@/services/compra/getCompraById.service'
	import create from '@/services/compra/createCompra.service'
	import update from '@/services/compra/updateCompra.service'
	import type Compra from '@/services/compra/models/Compra'
	import get from '@/services/establecimiento/getEstablecimiento.service'
	export default defineComponent({
		name: 'CompraEdicion',
	})
</script>
<script setup lang="ts">
	// Refs
	const fileUpload = ref(null)
	// Computed
	const canSave = computed(() => {
		return !v$.value.editData.$invalid
	})
	const mostrarArticulos = computed(() => {
		return editData && editData.value.articulos ? editData.value.articulos.length !== 0 : false
	})

	// Data
  const showDatePickerFechaCompra = ref(false)
	const adding = ref(false)
	const route = useRoute()
	let editData = ref<Compra>({
		id: '',
		totalCompra: 0,
		factura: '',
		establecimiento: null,
		fechaCompra: '',
		fechaCreacion: '',
		notas: '',
		borrable: true,
		articulos: [],
	})
	if (route.params['id']) {
		getById(route.params['id'].toString()).then((response) => {
			editData.value = response.data as Compra
		})
	} else {
		adding.value = true
	}
	const listaEstablecimientos = (await get()).data
	// Validations
	const validations = computed(() => {
    const fechaCompraValid = (value: string) => {
      return value ? new Date(value).getTime() < new Date().getTime() : false
    }
		return {
			editData: {
				establecimiento: { required },
				fechaCompra: { required, fechaCompraValid },
				borrable: { required },
			},
		}
	})
	// Use the "useVuelidate" function to perform form validation
	const v$ = useVuelidate(validations, { editData })

	// Methods
	const onBack = () => {
		if (adding.value) {
			router.push('/compras')
		} else {
			router.push(`/compra-detalle/${editData.value.id}`)
		}
	}

  const onUpdateArticulo = (data: any) => {
    console.log("🚀 ~ onUpdateArticulo ~ data:", data)
  }

  const onSaveArticulo = (data: any) => {
    console.log("🚀 ~ onSaveArticulo ~ data:", data)
    editData.value.articulos.push(data)
  }

	const save = async () => {
		// if (adding.value) {
		// 	createCompra(editData.value)
		// } else {
		// 	updateCompra(editData.value)
		// }
	}

	const createCompra = (data: any) => {
		console.log('🚀 ~ createCompra ~ data:', data)
		create(data).then((response) => {
			onBack()
		})
	}

	const updateCompra = (data: any) => {
		update(data).then((response) => {
			onBack()
		})
	}

	const getFile = () => {
		document.getElementById('upfile')?.click()
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
