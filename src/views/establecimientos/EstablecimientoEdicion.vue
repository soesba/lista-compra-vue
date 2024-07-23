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
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
  import { computed } from 'vue'
  import router from '@/router'
  import getById from '@/services/establecimiento/getEstablecimientoById.service'
  import create from '@/services/establecimiento/createEstablecimiento.service'
  import update from '@/services/establecimiento/updateEstablecimiento.service'
  import { fileToBase64 } from '@/utils/utils'
  export default defineComponent({
    name: 'EstablecimientoEdicion',
  })
</script>
<script setup lang="ts">
  import DetalleToolbar from '@/components/DetalleToolbar.vue'
  import { required, requiredIf } from 'vuelidate/lib/validators'
  import { useVuelidate } from '@vuelidate/core'
  import getTipoEstablecimiento from '@/services/tipoEstablecimiento/getTipoEstablecimiento.service'
  import { useRoute } from 'vue-router'
  import { noLogoUrl } from '@/main'

  // Refs
  const fileUpload = ref(null)
  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })
  const mostrarDirecciones = computed(() => {
    return editData && editData.value.direcciones ? editData.value.direcciones.length !== 0 : false
  })
  const fileName = computed(() => {
    return selectedFile ? selectedFile.name : ''
  })
  const getImageSrc = computed(() => {
    return editData.value.logo ? editData.value.logo.content : noLogoUrl
  })

  // Data
  const adding = ref(false)
  const route = useRoute()
  let editData = ref<any>({ borrable: true })
  if (route.params['id']) {
    console.log("🚀 ~ onMounted ~ route.params['id']:", route.params['id'])
    getById(route.params['id'].toString()).then(response => {
      editData.value = response.data
    })
  } else { 
    adding.value = true
  }

  const typeFile = 'image/png, image/gif, image/jpeg, image/svg'
  const upload = ''
  let selectedFile = reactive<any>(null)
  const tiposEstablecimientos = (await getTipoEstablecimiento()).data

  // Validations
  const validations = computed(() => {
    return {
      editData: {
        id: { required: requiredIf(!adding.value) },
        nombre: { required },
        tipoEstablecimiento: { required },
        borrable: { required }
      }
    }
  })
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { editData })

  onMounted(() => {

  })
  // Methods	
  const onBack = () => {
    if (adding.value) {
      router.push('/establecimientos')
    } else {
      router.push(`/establecimiento-detalle/${editData.value.id}`)
    }
  }

  const save = async () => {
    if (selectedFile) {
      const imgBase64 = await fileToBase64(selectedFile)
      editData.value.logo = {
        type: selectedFile.type,
        content: imgBase64
      }
    }
    if (adding.value) {
      createEstablecimiento(editData.value)
    } else {
      updateEstablecimiento(editData.value)
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
    if (selectedFile) {
      var reader = new FileReader()

      reader.onload = function (e) {
        if (!editData.value.logo) {
          editData.value.logo = {}
        }
        editData.value.logo.type = selectedFile.type
        editData.value.logo.content = URL.createObjectURL(selectedFile)
      }

      reader.readAsDataURL(selectedFile)
    }
  }

  const resetLogo = () => {
    selectedFile = null
    fileUpload.value = null
    editData.value.logo = null
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
