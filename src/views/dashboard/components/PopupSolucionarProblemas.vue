<template>
  <v-card :title="title" :subtitle="subtitle">
    <template v-slot:append>
      <v-icon icon="mdi-close" @click="close"></v-icon>
    </template>
    <v-card-text>
      <div>
        <ul v-for="(error, index) in erroresUi" :key="index">
          <li><span class="title">Error:</span> {{ error.mensaje }}</li>
          <li>
            <span class="title">Resolución:</span>
            {{ getResolutionForMessage(error.mensaje as string) }}
          </li>
          <div v-if="!error.resuelto">
            <combo-component
              :tipo-dato="TipoDato.Usuario"
              v-model="usuarioSeleccionado"
              variant="underlined"
              :return-object="false"
              required>
            </combo-component>
            <div class="actions">
              <v-btn
                :disabled="btnResolverDisabled(error)"
                variant="text"
                color="primary"
                text="Resolver"
                @click="onResolverClick(error, index)">
              </v-btn>
            </div>
          </div>
          <div v-else>
            <span class="title">Resuelto</span>
          </div>
        </ul>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  import ComboComponent from '@/components/combos/ComboComponent.vue'
  import { uiStore } from '@/main'
  import resolverErrorUsuario from '@/services/commons/resolverErrorUsuario.service'
  import { TipoDato } from '@/services/desplegables/models/TipoDato'
  import { capitalize, ref } from 'vue'

  const emit = defineEmits(['resolve'])
  const props = defineProps({
    title: String,
    data: Object
  })

  const subtitle = props.data?.multiple ? 'Resolución múltiple' : 'Resolución única'
  const errores = props.data?.fallas || []
  const modeloTratado = props.data?.modelo

  const erroresUi = Array.from(new Set(errores.map((item: any) => capitalize(item.mensaje)))).map(mensaje => ({
    resuelto: false,
    mensaje
  }))

  console.log('LOG~ ~ :20 ~ mensajesUnicos:', erroresUi)

  const usuarioSeleccionado = ref<string>('')

  const btnResolverDisabled = (error: any): boolean => {
    switch (error.mensaje.toLowerCase()) {
      case 'no tiene usuario asociado':
        return !usuarioSeleccionado.value
      default:
        return false
    }
  }

  const getResolutionForMessage = (mensaje: string): string => {
    switch (mensaje.toLowerCase()) {
      case 'no tiene usuario asociado':
        return `Asignar un usuario válido ${props.data?.multiple ? 'a los registros.' : 'al registro.'}`
      default:
        return 'No se encontró una resolución específica para este error.'
    }
  }

  const onResolverClick = (error: any, index: number) => {
    console.log('LOG~ ~ :47 ~ onResolverClick ~ error, index:', error, index)
    console.log('LOG~ ~ :49 ~ onResolverClick ~ usuarioSeleccionado:', usuarioSeleccionado.value)
    switch (error.mensaje.toLowerCase()) {
      case 'no tiene usuario asociado':
        resolverErrorUsuario(
          modeloTratado.nombre,
          errores.map((e: any) => e.id),
          usuarioSeleccionado.value
        )
          .then((response: any) => {
            emit('resolve', response)
            close()
          })
          .catch(error => {
            console.error('Error al resolver el problema:', error)
          })
        break
      default:
        console.log('No se encontró una resolución para este error.')
    }
  }

  const close = () => {
    uiStore.hideCustomDialog()
  }
</script>
<style lang="scss" scoped>
  :deep(.v-card-item) {
    color: rgb(var(--v-theme-primary));
  }
  :deep(.v-card-text) {
    align-self: flex-start;
  }
  ul {
    text-align: left;
    li {
      list-style: none;
      span.title {
        font-weight: bold;
        color: rgb(var(--v-theme-primary));
      }
      &:last-of-type {
        margin-bottom: 15px;
      }
    }
  }
</style>
