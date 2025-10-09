<template>
  <v-card :title="title">
    <v-card-subtitle>
      <div class="input-file">
        <v-file-input
          label="Seleccionar imagen"
          id="upfile"
          ref="fileUpload"
          type="file"
          :accept="typeFile"
          :value="upload"
          prepend-icon="mdi-camera"
          @change="onSelectImage" />
      </div>
    </v-card-subtitle>
    <v-card-text class="avatares">
      <v-avatar :size="48" v-for="avatarUrl in avatares" :key="avatarUrl" @click="seleccionAvatar(avatarUrl)">
        <v-img :src="avatarUrl" :lazy-src="avatarUrl" aspect-ratio="1"></v-img>
      </v-avatar>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="primary" @click="onAceptarClick">Aceptar</v-btn>
      <v-btn variant="text" color="primary" @click="onCancelarClick">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { listaAvatares, uiStore } from '@/main'
  import Imagen from '@/services/commons/Imagen'
import { getBase64FromImageUrl } from '@/utils/utils'
  import { ref, reactive } from 'vue'

  const typeFile = 'image/png, image/gif, image/jpeg, image/svg'
  const upload = ''
  const title = 'Avatar'
  const fileUpload = ref()
  let selectedFile = reactive<File>({} as File)
  const imagen = ref<Imagen>({} as Imagen)
  const emitter = defineEmits(['changed', 'reset'])
  const avatares = listaAvatares()

  const onSelectImage = () => {
    selectedFile = fileUpload.value.modelValue
    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = function () {
        if (!imagen.value) {
          imagen.value = {} as Imagen
        }
        imagen.value.type = selectedFile.type
        imagen.value.content = URL.createObjectURL(selectedFile)
      }

      reader.readAsDataURL(selectedFile)
    }
  }

  const seleccionAvatar = async (avatarUrl: string) => {
    if (avatarUrl.includes('no-avatar')) {
      emitter('reset')
      uiStore.hideCustomDialog()
    } else {
      const imageData = await getBase64FromImageUrl(avatarUrl)
      imagen.value = {} as Imagen
      imagen.value.content = imageData as string
      imagen.value.type = 'image/svg+xml'
      onAceptarClick()
    }
  }

  const onAceptarClick = () => {
    if (imagen.value) {
      emitter('changed', { imagen: imagen.value })
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
