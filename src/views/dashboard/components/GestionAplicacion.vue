<template>
  <div class="base-datos">
    <TitleView :titulo="title" :subtitulo="subtitle" :show-menu="false"></TitleView>
    <!-- <div class="lista-configuraciones">
      <v-card
          v-for="configuracion in configuraciones"
          :key="configuracion.id"
          class="config-card"
      >
        <v-card-title>{{ configuracion.nombre }}</v-card-title>
        <v-card-subtitle v-if="configuracion.texto">{{ configuracion.texto }}</v-card-subtitle>
        <v-card-text>
          <div v-for="valor in configuracion.valores" :key="valor">{{ valor }}</div>
        </v-card-text>
      </v-card>
    </div> -->
    <TitleSection
      titulo="Modelos de la aplicación"
      subtitulo="Entidades principales con los que trabaja la aplicación"></TitleSection>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="modelo in modelosUI" :key="modelo.id" :title="modelo.nombre">
        <v-expansion-panel-text>
          <div class="inputGroup">
            <div class="labelFor">Identificador:</div>
            <div>{{ modelo.id }}</div>
          </div>
          <div class="actions center">
            <v-btn color="error" @click="onClickEliminar(modelo.id)">Eliminar</v-btn>
            <v-btn color="primary" @click="checkUso(modelo.id)">Comprobar uso</v-btn>
          </div>
          <div class="resultado-uso" v-if="modelo.showResultado">
            <div v-if="!modelo.uso">No se han encontrado usos para este modelo.</div>
            <div v-else>
              <div>El modelo se está utilizando en las siguientes entidades:</div>
              <div v-for="(uso, index) in modelo.uso" :key="index">
                <label>{{ uso.entidad }}</label>
                <ul>
                  <li v-for="detalle in uso.detalles" :key="index">{{ detalle }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="actions">
            <v-btn v-if="modelo.showResultado" @click="reset(modelo.id)">Reset</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
  import TitleSection from '@/components/TitleSection.vue'
  import get from '@/services/modelo/getModelos.service'
  import Modelo from '@/services/modelo/models/Modelo'
  import { ref } from 'vue'
  import checkUsoModelo from '@/services/modelo/checkUsoModelo.service'
  import { uiStore } from '@/main'
  import deleteModelo from '@/services/modelo/deleteModelo.service'

  const title = 'Gestión de la aplicación'
  const subtitle = 'Utilidades para la gestión de la aplicación'

  // const showResultado = (modeloId: string) => computed(() => {
  //   return showResultadoUso.value && modeloTratadado.value === modeloId
  // })

  // const configuraciones = ref<Configuracion[]>((await getConfiguracionesByCategoria('dots_menu')).data as Configuracion[])
  const modelos = ref<Array<Modelo>>((await get()).data as Array<Modelo>)
  const modelosUI = ref<Array<any>>(
    modelos.value.map(m => {
      return {
        ...m,
        showResultado: false,
        uso: null
      }
    })
  )

  const reset = (modeloId: string) => {
    const modeloEncontrado = modelosUI.value.find(m => m.id === modeloId)
    if (modeloEncontrado) {
      modeloEncontrado.showResultado = false
      modeloEncontrado.uso = null
    }
  }

  const checkUso = async (modeloId: string) => {
    const resultadoUso = (await (checkUsoModelo(modeloId) as any)).data
    console.log(resultadoUso)
    const modeloEncontrado = modelosUI.value.find(m => m.id === modeloId)
    if (modeloEncontrado) {
      modeloEncontrado.uso = resultadoUso.length !== 0 ? resultadoUso : null
      modeloEncontrado.showResultado = true
    }
  }

  const onClickEliminar = (modeloId: string) => {
    uiStore.showConfirmDialog({
      props: {
        text: 'Si elimina este elemento, se eliminará toda la información relacionada (como configuraciones de usuario, etc.). ¿Desea continuar?',
        title: 'Confirmación'
      },
      aceptarFn: () => eliminarModelo(modeloId)
    })
  }

  const eliminarModelo = (modeloId: string) => {
    deleteModelo(modeloId).then(() => {
      modelos.value = modelos.value.filter(modelo => modelo.id !== modeloId)
    })
  }
</script>

<style lang="scss" scoped>
  .v-expansion-panels {
    padding: 5px;

    .actions.center {
      justify-content: center;
    }

    ul {
      list-style: none;
    }

    .resultado-uso {
      margin-top: 15px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .v-expansion-panel {
      button {
        margin-top: 10px;
        justify-self: flex-end;
      }
    }
  }
</style>
