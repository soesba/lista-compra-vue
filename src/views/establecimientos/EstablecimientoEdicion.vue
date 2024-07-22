<template>
   <detalle-toolbar>
    <template v-slot:left>
      <v-btn icon="mdi-close" @click="onBack" variant="text" color="primary"></v-btn>
    </template>
    <template v-slot:right>
      <v-btn variant="text" color="primary" @click="save()" :disabled="!canSave">Guardar</v-btn>
    </template>
  </detalle-toolbar>
  <div class="form">
    <div class="header">
      <v-img class="logo" :src="noLogoUrl"></v-img>
      <label class="text-h6">{{  props.data.nombre }}</label>
    </div>
    <div class="body">
      <div class="inputGroup">
        <v-text-field label="Nombre*" required v-model="editData.nombre"
          :error-messages="v$.editData.nombre.$errors.map(e => e.$message)"
          @blur="v$.editData.nombre.$touch"
          @input="v$.editData.nombre.$touch"
        ></v-text-field>
			</div>
      <div class="inputGroup">
        <v-select
						label="Categoría*"
						required
						v-model="editData.tipoEstablecimiento"
						:items="tiposEstablecimientos"
						item-title="nombre"
						item-value="id"
						:error-messages="v$.editData.tipoEstablecimiento.$errors.map(e => e.$message)"
						@blur="v$.editData.tipoEstablecimiento.$touch"
					></v-select>
      </div>
      <div class="inputGroup">
				<label class="labelFor">Direcciones</label>
      </div>
      <div v-if="mostrarDirecciones" class="inputGroup"></div>
      <div class="addDireccion">
        <v-btn variant="text" color="primary">Añadir dirección</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
	import { defineComponent, reactive } from 'vue'
	import { computed } from 'vue'
import router from '@/router'
	export default defineComponent({
		name: 'EstablecimientoEdicion',
	})
</script>
<script setup lang="ts">
import DetalleToolbar from '@/components/DetalleToolbar.vue' 
	import { required, requiredIf } from 'vuelidate/lib/validators'
	import { useVuelidate } from '@vuelidate/core'
	import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
	import getTipoEstablecimiento from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
  import type { PropType } from 'vue'
	import { eventCardStore, modelStore, noLogoUrl, uiStore } from '@/main'

		// Props
	const props = defineProps({
    data: {
      type: Object as PropType<Establecimiento>,
      default: modelStore.establecimiento
    },
		adding: {
			type: Boolean,
			default: false
		}
  })
	// Computed
	const canSave = computed(() => {
		return !v$.value.$invalid
	})
  const mostrarDirecciones = computed(() => {
    return editData.direcciones.length !== 0
  })
	// Data
	let editData = reactive<any>({ ...props.data })
	const tiposEstablecimientos = (await getTipoEstablecimiento()).data
	console.log("🚀 ~ editData:", editData)
	// Validations
	const validations = computed(() => {
		return {
			editData: {
				id: { required: requiredIf(!props.adding) },
				nombre: { required },
				tipoEstablecimiento: { required },
				borrable: { required }
			}
		}
	})
	// Use the "useVuelidate" function to perform form validation
	const v$ = useVuelidate(validations, { editData })
	// Methods	
  const onBack = () => {
    router.push('/establecimiento-detalle')
  }
	const cancel = () => {
		eventCardStore.cancelCard()
		uiStore.hideCustomDialog()
	}

	const save = () => {
		console.log("🚀 ~ save ~ editData:", editData)
		eventCardStore.saveCard({ adding: props.adding, data: editData })
		uiStore.hideCustomDialog()
	}
		
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.logo {
  width: 150px;
}
.addDireccion {
  display: flex;
  justify-content: center
}
</style>
