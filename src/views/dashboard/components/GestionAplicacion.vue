<template>
  <div class="base-datos">
    <TitleView :titulo="title" :subtitulo="subtitle" :show-menu="false"></TitleView>
    <div class="seccion">
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
              <v-btn color="error" @click="onClickEliminar(modelo)">Eliminar</v-btn>
              <v-btn color="primary" @click="checkUso(modelo.id)">Comprobar uso</v-btn>
              <v-btn color="primary" @click="onCheckDataClick(modelo.id)">Inconsistencias</v-btn>
            </div>
            <div class="resultado-uso" v-if="modelo.showResultadoCheckUso">
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
            <div class="resultado-uso" v-if="modelo.showResultadoCheckData">
              {{ modelo.resultado }}
            </div>
            <div class="actions">
              <v-btn
                v-if="modelo.showResultadoCheckUso || modelo.showResultadoCheckData"
                @click="reset(modelo.id)"
                >Reset</v-btn
              >
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
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
  import checkData from '@/services/commons/checkData.service'

  const title = 'Gestión de la aplicación'
  const subtitle = 'Utilidades para la gestión de la aplicación'

  const modelos = ref<Array<Modelo>>((await get()).data as Array<Modelo>)
  const modelosUI = ref<Array<any>>(
    modelos.value.map(m => {
      return {
        ...m,
        showResultadoCheckUso: false,
        uso: null
      }
    })
  )

  const reset = (modeloId: string) => {
    const modeloEncontrado = modelosUI.value.find(m => m.id === modeloId)
    if (modeloEncontrado) {
      modeloEncontrado.showResultadoCheckUso = false
      modeloEncontrado.showResultadoCheckData = false
      modeloEncontrado.uso = null
    }
  }

  const checkUso = async (modeloId: string) => {
    const resultadoUso = (await (checkUsoModelo(modeloId) as any)).data
    console.log(resultadoUso)
    const modeloEncontrado = modelosUI.value.find(m => m.id === modeloId)
    if (modeloEncontrado) {
      modeloEncontrado.uso = resultadoUso
      modeloEncontrado.showResultadoCheckUso = true
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

  const onCheckDataClick = (modeloId: number) => {
    console.log('Comprobar datos de la aplicación')
    const modelo = modelosUI.value.find(m => m.id === modeloId.toString())
    if (modelo) {
      console.log(`Comprobar datos de modelo ${modelo.nombre}`)
      checkData(modelo.nombre).then(response => {
        const data = response.data
        modelo.resultado = `Total de registros comprobados: ${data.total}\nTotal de fallas encontradas: ${data.totalFallas}\n\nFallas:\n${data.fallas.join('\n')}`
        modelo.showResultadoCheckData = true
      })
    }
  }
</script>

<style lang="scss" scoped>
  .v-expansion-panels {
    padding: 5px;

    .actions.center {
      flex-wrap: wrap;
      justify-content: center;
    }

    ul {
      list-style: none;
    }

    .resultado-uso {
      white-space: pre-wrap;
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
