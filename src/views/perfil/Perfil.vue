<template>
  <v-card>
    <v-avatar class="avatar" :size="150" @click="onCambiarFotoClick">
      <v-img :src="getImageSrc" :lazy-src="noPhotoUrl" aspect-ratio="1"></v-img>
    </v-avatar>
    <v-card-title>{{ usuario.username }}</v-card-title>
    <v-card-subtitle
      ><strong>Fecha de alta: {{ usuario.fechaCreacion }}</strong></v-card-subtitle
    >
    <v-card-text>
      <div class="form">
        <div class="body">
          <div class="inputGroup">
            <v-text-field
              variant="underlined"
              label="Usuario*"
              required
              :class="{ dirty: v$.usuario.username.$dirty }"
              v-model="usuario.username"
              :error-messages="v$.usuario.username.$errors.map((e: any) => e.$message.toString())"
              @input="v$.usuario.username.$touch"></v-text-field>
          </div>
          <div class="inputGroup">
            <v-text-field
              variant="underlined"
              label="Nombre*"
              required
              :class="{ dirty: v$.usuario.nombre.$dirty }"
              v-model="usuario.nombre"
              :validations="v$.usuario.nombre"
              :error-messages="v$.usuario.nombre.$errors.map((e: any) => e.$message.toString())"
              @input="v$.usuario.nombre.$touch"></v-text-field>
          </div>
          <div class="inputGroup">
            <v-text-field
              variant="underlined"
              label="Primer apellido*"
              required
              :class="{ dirty: v$.usuario.primerApellido.$dirty }"
              :validations="v$.usuario.primerApellido"
              v-model="usuario.primerApellido"
              @input="v$.usuario.primerApellido.$touch"></v-text-field>
          </div>
          <div class="inputGroup">
            <v-text-field
              variant="underlined"
              label="Segundo apellido*"
              required
              :class="{ dirty: v$.usuario.segundoApellido.$dirty }"
              v-model="usuario.segundoApellido"
              :validations="v$.usuario.segundoApellido"
              @input="v$.usuario.segundoApellido.$touch"></v-text-field>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="text" color="primary" @click="onCancelarClick">Cancelar</v-btn>
      <v-btn :disabled="btnGuardarDisabled" variant="text" color="primary" @click="onGuardarClick"
        >Guardar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
  import { authStore, uiStore } from '@/main'
  import { computed, markRaw, ref } from 'vue'
  import { required } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import Usuario from '@/services/usuario/models/Usuario'
  import getByUsername from '@/services/usuario/getUsuarioByUsername.service'
  import update from '@/services/usuario/updateUsuario.service'
  import ImageSelect from '@/components/ImageSelect.vue'

  const noPhotoUrl = new URL('@/assets/images/no-avatar.png', import.meta.url).href

  console.log(authStore.getUsuarioLogueado.username)
  const usuario = ref((await getByUsername(authStore.getUsuarioLogueado.username)).data as Usuario)
  let originalUsuario = { ...usuario.value }

  const btnGuardarDisabled = computed(() => {
    return v$.value.$invalid || !v$.value.$dirty
  })

  const getImageSrc = computed(() => {
    return usuario.value.foto ? usuario.value.foto.content : noPhotoUrl
  })
  // Validations
  const validations = computed(() => {
    return {
      usuario: {
        // id: { required: requiredIf(!adding) },
        username: { required },
        nombre: { required },
        primerApellido: {},
        segundoApellido: {},
        foto: {}
      }
    }
  })
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { usuario })

  const onGuardarClick = () => {
    update(usuario.value).then(response => {
      originalUsuario = response.data as Usuario
      usuario.value = { ...originalUsuario }
      v$.value.$reset()
    })
  }

  const onCancelarClick = () => {
    usuario.value = { ...originalUsuario }
    v$.value.$reset()
  }

  const onCambiarFotoClick = () => {
     uiStore.showCustomDialog({
        component: markRaw(ImageSelect),
        events: {
          changed: (data: any) => {
            console.log('LOG~ ~ :123 ~ onCambiarFotoClick ~ data:', data)
            if (data && data.imagen) {
              usuario.value.foto = data.imagen
              v$.value.usuario.$touch()
            } else {
              usuario.value.foto = null
              v$.value.usuario.$touch()
            }
          }
        }
      })
  }
</script>
<style lang="scss" scoped>
  .v-card {
    color: rgb(var(--v-theme-primary));
  }
  .dirty {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  }
  :deep(.v-avatar.v-avatar--size-x-large) {
      --v-avatar-height: 128px;
  }
  .avatar {
    margin-top: 5px;
    cursor: pointer;
  }
</style>
