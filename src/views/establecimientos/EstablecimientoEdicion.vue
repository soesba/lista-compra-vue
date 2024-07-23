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
    <div class="wrapper-logo">
      <v-img class="logo" :src="getImageSrc"></v-img>
      <div class="controles-logo">
        <v-btn variant="text" color="primary" @click="getFile()">Cambiar imagen</v-btn>
        <v-btn variant="text" color="primary" @click="resetLogo()">Quitar imagen</v-btn>
      </div>
      <div class="input-file">
        <input id="upfile" ref="fileUpload" type="file" :accept="typeFile" :value="upload" @change="onSelectLogo" />
      </div>
    </div>
    <div class="body">
      <div class="inputGroup">
        <v-text-field label="Nombre*" required v-model="editData.nombre"
          :error-messages="v$.editData.nombre.$errors.map(e => e.$message)" @blur="v$.editData.nombre.$touch"
          @input="v$.editData.nombre.$touch"></v-text-field>
      </div>
      <div class="inputGroup">
        <v-select label="Categoría*" required v-model="editData.tipoEstablecimiento" :items="tiposEstablecimientos"
          item-title="nombre" item-value="id"
          :error-messages="v$.editData.tipoEstablecimiento.$errors.map(e => e.$message)"
          @blur="v$.editData.tipoEstablecimiento.$touch"></v-select>
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
  import { defineComponent, reactive, ref, toRefs } from 'vue'
  import { computed } from 'vue'
  import router from '@/router'
  import getById from '@/services/establecimiento/getEstablecimientoById.service'
  import create from '@/services/establecimiento/createEstablecimiento.service'
  import update from '@/services/establecimiento/updateEstablecimiento.service'
  import { fileToBase64 } from '@/utils/utils'
import type TipoEstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
import type EstablecimientoRequest from '@/services/establecimiento/models/EstablecimientoRequest'
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
  import { useRoute } from 'vue-router'
  import { eventCardStore, noLogoUrl, uiStore } from '@/main'
  // Refs
  const fileUpload = ref(null)
  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })
  const mostrarDirecciones = computed(() => {
    return editData.direcciones.length !== 0
  })
  const fileName = computed(() => {
    return selectedFile ? selectedFile.name : ''
  })
  const getImageSrc = computed(() => {
    return editData.logo  ? editData.logo.content : noLogoUrl
  })

  // Data
  const route = useRoute()
  const adding = route.params['adding'] ? route.params['adding'].toString() : false
  let editData: any = (await getById(route.params['id'].toString())).data
  const typeFile = 'image/png, image/gif, image/jpeg'
  const upload = ''
  let selectedFile = reactive<any>(null)
  const tiposEstablecimientos = (await getTipoEstablecimiento()).data
  console.log("🚀 ~ editData:", editData)
  // Validations
  const validations = computed(() => {
    return {
      editData: {
        id: { required: requiredIf(!adding) },
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
    router.push(`/establecimiento-detalle/${editData.id}`)
  }

  const save = async () => {
    console.log("🚀 ~ save ~ editData:", editData)
    if (selectedFile) {
      const imgBase64 = await fileToBase64(selectedFile)
      editData.logo = {
        type: selectedFile.type,
        content: imgBase64
      }
    }
    if (adding) {
      createEstablecimiento(editData)
    } else {
      updateEstablecimiento(editData)
    }    
  }

  const createEstablecimiento = (data: any) => {
    data.borrable = true
  create(data).then(response => {    
    onBack()
  })
}

const updateEstablecimiento = (data: any) => {
  update(data).then(response => {
    onBack()
  })
}

  const getFile = () => {
    document.getElementById('upfile')?.click()
  }

  const onSelectLogo = (evt: any) => {
    selectedFile = evt.target.files[0]
    console.log("🚀 ~ onSelectLogo ~ selectedFile:", selectedFile)
    if (selectedFile) {
      var reader = new FileReader()

      reader.onload = function (e) {
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
    overflow: hidden
  }

  .addDireccion {
    display: flex;
    justify-content: center
  }
</style>
