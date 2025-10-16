<template>
  <div class="datos-basicos">
    <v-avatar class="avatar" :size="150" @click="onCambiarFotoClick">
      <v-img :src="getImageSrc" :lazy-src="noPhotoUrl" aspect-ratio="1"></v-img>
    </v-avatar>
    <TitleView :titulo="usuario.username" :subtitulo="'Fecha de alta: ' + usuario.fechaCreacion" :show-menu="false"></TitleView>
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
  </div>
  <div class="preferencias">
    <TitleView titulo="Preferencias" subtitulo="Apariencia de la interfaz" :show-menu="false"></TitleView>
    <div class="form">
      <div class="body">
        <div class="inputGroup">
          <v-expansion-panels>
            <v-expansion-panel v-for="modelo in modelos" :key="modelo.id" :title="modelo.nombre">
              <v-expansion-panel-text>
                <v-radio-group :label="config.texto" v-for="config in configuraciones" v-model="config.valorActual" @update:model-value="(value) => config.click(value)">
                  <v-radio v-for="valor in config.valores" :label="valor.nombre" :value="valor.valor"></v-radio>
                </v-radio-group>
                </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <v-btn variant="text" color="primary" @click="onCancelarClick">Cancelar</v-btn>
    <v-btn :disabled="btnGuardarDisabled" variant="text" color="primary" @click="onGuardarClick">Guardar</v-btn
    >
  </div>
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
  import getConfiguracionesByCategoria from '@/services/configuracion/getConfiguracionesByCategoria.service'
import get from '@/services/modelo/getModelos.service'
import TitleView from '@/components/TitleView.vue'

  const noPhotoUrl = new URL('@/assets/images/no-avatar.png', import.meta.url).href

  console.log(authStore.getUsuarioLogueado.username)
  const usuario = ref((await getByUsername(authStore.getUsuarioLogueado.username)).data as Usuario)
  let originalUsuario = { ...usuario.value }
  const modelos = (await get()).data as Array<any>;
  console.log('LOG~ ~ :30 ~ modelos:', modelos)
  const configuraciones = ref<Array<any>>((await getConfiguracionesByCategoria('dots_menu')).data as Array<any>);
  const preferenciasUsuario = usuario.value.preferencias ? usuario.value.preferencias : []

  configuraciones.value.forEach(config => {
    const pref = preferenciasUsuario.find((p: any) => p.id === config.id)
    if (pref) {
      config.valorActual = pref.valor
    } else {
      config.valorActual = config.valorDefecto
    }
  });

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
  .datos-basicos {
    display: flex;
    flex-direction: column;
    align-items: center;
    // color: rgb(var(--v-theme-primary));
    .form {
      width: 100%;
    }
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

  .v-expansion-panel {
    * {
      font-size: 1rem;
    }
  }
</style>
