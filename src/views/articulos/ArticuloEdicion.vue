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
					label="Nombre*"
					required
					v-model="editData.nombre"
					:error-messages="v$.editData.nombre.$errors.map((e) => e.$message.toString())"
					@blur="v$.editData.nombre.$touch"
					@input="v$.editData.nombre.$touch"
				></v-text-field>
			</div>
			<div class="inputGroup">
				<v-text-field variant="underlined" label="Descripción" v-model="editData.descripcion"></v-text-field>
			</div>
			<div class="inputGroup">
				<combo-component
						:tipo-dato="TipoDato.TipoUnidad"
						:model-value="editData.tiposUnidad"
						label="Unidades de medida (máx 2)"
						required
						multiple
						:error-messages="v$.editData.tiposUnidad.$errors.map((e: any) => e.$message)"
						@blur="v$.editData.tiposUnidad.$touch()"
						@change="onChange"
					></combo-component>
			</div>
      <div class="inputGroup">
				<label class="labelFor">Histórico de precios</label>
			</div>
      <HistoricoPrecios :precios="editData.precios" :editable="true"></HistoricoPrecios>
		</div>
	</div>
</template>

<script lang="ts">
import ComboComponent from '@/components/combos/ComboComponent.vue'
import DetalleToolbar from '@/components/DetalleToolbar.vue'
import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { TipoDato } from '@/services/desplegables/models/TipoDato'
import { useRoute } from 'vue-router'
import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import { modelStore } from '@/main'
import getArticuloById from '@/services/articulo/getArticuloById.service'
import create from '@/services/articulo/createArticulo.service'
import update from '@/services/articulo/updateArticulo.service'
import ArticuloResponse from '@/services/articulo/models/ArticuloResponse'
import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
export default defineComponent({
	name: 'ArticuloEdicion',
})
</script>
<script setup lang="ts">
// Computed
const canSave = computed(() => {
	return !v$.value.$invalid
})

// Data
const adding = ref(false)
const editData = reactive<any>(modelStore.getArticulo ? modelStore.getArticulo : { borrable: true })
if (!editData.id) {
	adding.value = true
}

// Validations
const validations = computed(() => {
  const maxTiposUnidad = (value: any) => {
		return value.length <= 2
	}
	return {
		editData: {
      id: { required: requiredIf(!adding) },
			nombre: { required },
			descripcion: {},
			tiposUnidad: { required, maxTiposUnidad },
			borrable: { required }
		}
	}
})
// Use the "useVuelidate" function to perform form validation
const v$ = useVuelidate(validations, { editData })

// Methods
const onChange = (event: any) => {
	editData.tiposUnidad = event
	v$.value.editData.tiposUnidad.$touch()
}

const onBack = () => {
	if (adding.value) {
		router.push('/articulos')
	} else {
		router.push(`/articulo-detalle/${editData.id}`)
	}
}

const save = async () => {
	delete editData.value.tmpId
	if (adding.value) {
		createArticulo(editData.value)
	} else {
		updateArticulo(editData.value)
	}
}

const createArticulo = (data: any) => {
	create(data).then(() => {
		onBack()
	})
}

const updateArticulo = (data: any) => {
	update(data).then(() => {
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
