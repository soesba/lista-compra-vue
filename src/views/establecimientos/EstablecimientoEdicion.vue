<template>
	<edition-toolbar @onBack="onBack" @onSave="save" :saveDisabled="!canSave" />
	<div class="form" v-if="editData">
		<div class="wrapper-logo">
			<v-img class="logo" :src="getImageSrc"></v-img>
			<div class="controles-logo">
				<v-btn variant="text" color="primary" @click="getFile()">Cambiar imagen</v-btn>
				<v-btn variant="text" color="primary" @click="resetLogo()">Quitar imagen</v-btn>
			</div>
			<div class="input-file">
				<input
					id="upfile"
					ref="fileUpload"
					type="file"
					:accept="typeFile"
					:value="upload"
					@change="onSelectLogo"
				/>
			</div>
		</div>
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
				<combo-component
					:tipo-dato="TipoDato.TipoEstablecimientos"
					:model-value="editData.tipoEstablecimiento"
          :return-object="true"
					required
					:error-messages="v$.editData.tipoEstablecimiento.$errors.map((e) => e.$message)"
					@blur="v$.editData.tipoEstablecimiento.$touch"
					@change="onChange"
				></combo-component>
			</div>
			<div class="inputGroup">
				<label class="labelFor">Direcciones</label>
        <label v-if="!mostrarDirecciones"> No hay direcciones </label>
			</div>
      <direccion-edicion @update-direccion="onUpdateDireccion" @delete-direccion="onDeleteDireccion" v-for="direccion in editData.direcciones" :direccion="direccion"></direccion-edicion>
			<direccion-edicion @save-direccion="onSaveDireccion"></direccion-edicion>
		</div>
	</div>
</template>

<script lang="ts">
import ComboComponent from '@/components/combos/ComboComponent.vue'
import DireccionEdicion from '@/components/DireccionEdicion.vue'
import EditionToolbar from '@/components/EditionToolbar.vue'
import { required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { TipoDato } from '@/services/desplegables/models/TipoDato'
import { noLogoUrl } from '@/main'
import { modelStore, eventStore } from '@/store/instances'
import { defineComponent, reactive, ref } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import create from '@/services/establecimiento/createEstablecimiento.service'
import update from '@/services/establecimiento/updateEstablecimiento.service'
import { fileToBase64 } from '@/utils/utils'
import type Direccion from '@/services/establecimiento/models/Direccion'
export default defineComponent({
	name: 'EstablecimientoEdicion',
})
</script>
<script setup lang="ts">
// Refs
const fileUpload = ref(null)
// Computed
const canSave = computed(() => {
	return !v$.value.editData.$invalid
})

const mostrarDirecciones = computed(() => {
	return editData && editData.direcciones ? editData.direcciones.length !== 0 : false
})
const getImageSrc = computed(() => {
	return editData.logo && editData.logo.content ? editData.logo.content : noLogoUrl
})

// Data
const adding = ref(false)
const editData = reactive<any>(modelStore.getEstablecimiento || { borrable: true, direcciones: [] })
if (!editData.id) {
	adding.value = true
}

const typeFile = 'image/png, image/gif, image/jpeg, image/svg'
const upload = ''
let selectedFile = reactive<any>('')

// Validations
const validations = computed(() => {
	return {
		editData: {
			id: { required: requiredIf(!adding.value) },
			nombre: { required },
			tipoEstablecimiento: { required },
			borrable: { required },
		}
	}
})
// Use the "useVuelidate" function to perform form validation
const v$ = useVuelidate(validations, { editData })

// Methods
const onChange = (event: any) => {
	editData.tipoEstablecimiento = event
  v$.value.editData.tipoEstablecimiento.$touch()
}

const onBack = () => {
  modelStore.setEstablecimiento(null)
	if (adding.value) {
		router.push(eventStore.getRoutes.list)
	} else {
		router.push(`${eventStore.getRoutes.detail}/${editData.id}`)
	}
}

const onSaveDireccion = (dir: any) => {
	editData.direcciones.push(dir)
}

const onUpdateDireccion = (data: Direccion) => {
	editData.direcciones = editData.direcciones.map((item: any) => {
		if ((data.id && item.id === data.id) ||
        (data.tmpId && data.tmpId === item.tmpId)) {
			return data
		} else {
			return item
		}
	})
}

const onDeleteDireccion = (dir: Direccion) => {
	editData.direcciones = editData.direcciones.filter((item: Direccion) => {
		if (dir.tmpId) {
			return item.tmpId !== dir.tmpId
		} else {
			return item.id !== dir.id
		}
	})
}

const save = async () => {
	if (selectedFile) {
		const imgBase64 = await fileToBase64(selectedFile)
		editData.logo = {
			type: selectedFile.type,
			content: imgBase64,
		}
	}
  if (!editData.logo?.content) {
    editData.logo = null
  }
	delete editData.tmpId
	editData.direcciones = editData.direcciones.map((item: Direccion) => {
		delete item.tmpId
		return item
	})
	if (adding.value) {
		createEstablecimiento(editData)
	} else {
		updateEstablecimiento(editData)
	}
}

const createEstablecimiento = (data: any) => {
	create(data).then(() => {
		onBack()
	})
}

const updateEstablecimiento = (data: any) => {
	update(data).then(() => {
		onBack()
	})
}

const getFile = () => {
	document.getElementById('upfile')?.click()
}

const onSelectLogo = (evt: any) => {
	selectedFile = evt.target.files[0]
	if (selectedFile) {
		const reader = new FileReader()

		reader.onload = function () {
			if (!editData.logo) {
				editData.logo = {}
			}
			editData.logo.type = selectedFile.type
			editData.logo.content = URL.createObjectURL(selectedFile)
		}

		reader.readAsDataURL(selectedFile)
	}
}

const resetLogo = () => {
	selectedFile = null
	fileUpload.value = null
	editData.logo = null
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
