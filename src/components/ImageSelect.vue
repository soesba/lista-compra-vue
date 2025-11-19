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
      <v-avatar
        :size="48"
        v-for="avatar in avatares"
        :key="avatar.id"
        @click="seleccionAvatar(avatar.id)">
        <v-img
          :src="avatar.imagen.content"
          :lazy-src="avatar.imagen.content"
          aspect-ratio="1"></v-img>
      </v-avatar>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="primary" @click="onAceptarClick">Aceptar</v-btn>
      <v-btn variant="text" color="primary" @click="onCancelarClick">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { uiStore } from '@/main'
  import get from '@/services/avatar/getAvatares.service'
  import Avatar from '@/services/avatar/models/Avatar'
  import Imagen from '@/services/commons/models/Imagen'
  import { ref, reactive, onMounted } from 'vue'

  const typeFile = 'image/png, image/gif, image/jpeg, image/svg'
  const upload = ''
  const title = 'Avatar'
  const fileUpload = ref()
  let selectedFile = reactive<File>({} as File)
  const imagen = ref<Imagen | null>({} as Imagen)
  const emitter = defineEmits(['changed', 'close'])
  const avatares = ref<Avatar[]>([])

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

  const seleccionAvatar = async (id: string) => {
    if (id === '-1') {
      imagen.value = null
    } else {
      const avatarBase64 = await avatares.value.find(a => a.id === id)?.imagen
      imagen.value = avatarBase64 || null
    }
    onAceptarClick()
  }

  const onAceptarClick = () => {
    emitter('changed', { imagen: imagen.value })
    uiStore.hideCustomDialog()
  }
  const onCancelarClick = () => {
    uiStore.hideCustomDialog()
  }

  onMounted(async () => {
    avatares.value = (await get()).data as Avatar[]
    avatares.value.unshift({
      id: '-1',
      imagen: {
        content: new URL('@/assets/images/no-avatar.png', import.meta.url).href,
        type: 'image/png'
      },
      fechaSubida: ''
    })
  })
</script>
<style lang="scss" scoped>
  .avatares {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
