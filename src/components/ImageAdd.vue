<template>
  <v-card :title="title">
    <v-card-subtitle>
      <div class="input-file">
        <v-file-input
          label="Buscar en dispositivo"
          id="upfile"
          ref="fileUpload"
          type="file"
          :accept="typeFile"
          :value="upload"
          prepend-icon="mdi-camera"
          :disabled="inputFileDisabled"
          :validations="v$.selectedFile"
          @change="onSelectImage"
          @click:clear="onClickClear" />
      </div>
    </v-card-subtitle>
    <v-card-subtitle>
      O introduzca
      <v-text-field
        variant="underlined"
        label="URL de la imagen"
        v-model="imageUrl"
        clearable
        :disabled="textFieldDisabled"
        :validations="v$.imageUrl"
        error-help-text
        :error-messages="v$.imageUrl.$errors.map((e: any) => e.$message.toString())"
        @update="onUpdateUrl">
      </v-text-field>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn variant="text" color="primary" :disabled="btnAceptarDisabled" @click="onAceptarClick"
        >Aceptar</v-btn
      >
      <v-btn variant="text" color="primary" @click="onCancelarClick">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { uiStore } from '@/main'
  import Imagen from '@/services/commons/Imagen'
  import { fileToBase64, getBase64FromImageUrl, getImageTypeFromContent, isValidHttpUrl } from '@/utils/utils'
  import useVuelidate from '@vuelidate/core'
  import { requiredIf } from '@vuelidate/validators'
  import { ref, computed } from 'vue'

  const typeFile = 'image/png, image/gif, image/jpeg, image/svg'
  const upload = ''
  const title = 'Añadir avatar'
  const fileUpload = ref()
  let selectedFile = ref<File | null>()
  const imagen = ref<Imagen | null>(null)
  const emitter = defineEmits(['select', 'close'])
  const imageUrl = ref('')

  const inputFileDisabled = computed(() => imageUrl.value?.length > 0)
  const textFieldDisabled = computed(() => fileUpload.value?.modelValue?.length > 0)

  const btnAceptarDisabled = computed(() => v$.value.$invalid || (!selectedFile.value && !imageUrl.value))

    // Validations
  const validations = computed(() => {
    return {
      selectedFile: { required: requiredIf(() => !imageUrl.value || imageUrl.value.length === 0) },
      imageUrl: {
        isUrl: () =>{
          if (imageUrl.value) {
            return isValidHttpUrl(imageUrl.value)
          }
          return true
        },
        required: requiredIf(() => !selectedFile.value)
     }
    }
  })
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { selectedFile, imageUrl })

  const onSelectImage = () => {
    console.log('LOG ~ onSelectImage ~ selectedFile:', fileUpload.value.modelValue)
    selectedFile.value = fileUpload.value.modelValue
    imagen.value = null
    v$.value.$touch()
  }

  const onClickClear = () => {
    selectedFile.value = null
    imagen.value = null
    v$.value.$reset()
  }

  const onUpdateUrl = () => {
    console.log('LOG ~ onUpdateUrl ~ imageUrl:', imageUrl.value)
    fileUpload.value.reset()
    v$.value.$touch()
  }

  const onAceptarClick = async () => {
    // Seleccion de imagen desde el dispositivo
    if (selectedFile.value) {
      imagen.value = {} as Imagen
      imagen.value.type = selectedFile.value?.type
      imagen.value.content = await fileToBase64(selectedFile.value)
      console.log('LOG~ ~ :107 ~ onAceptarClick ~ imagen:', imagen)
    // Seleccion de imagen desde URL
    } else if (imageUrl) {
      const imageData = await getBase64FromImageUrl(imageUrl.value)
      imagen.value = {} as Imagen
      imagen.value.content = imageData as string
      imagen.value.type = getImageTypeFromContent(imagen.value.content) || 'image/png'
    }
    if (imagen.value?.content) {
      emitter('select', { imagen: imagen.value })
    }
    uiStore.hideCustomDialog()
  }
  const onCancelarClick = () => {
    uiStore.hideCustomDialog()
  }
</script>
<style lang="scss" scoped>
  .avatares {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
