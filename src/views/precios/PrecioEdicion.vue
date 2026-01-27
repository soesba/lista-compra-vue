<template>
  <edition-toolbar @onBack="onBack" @onSave="save" :saveDisabled="!canSave" />
  <div class="form" v-if="editData">
    <div class="body">
      <div class="inputGroup">
        <v-checkbox
          label="Protección contra borrado accidental"
          v-model="editData.borrable"
          :true-value="false"
          :false-value="true"></v-checkbox>
      </div>
      <div class="inputGroup">
        <v-text-field
          variant="underlined"
          label="Fecha*"
          :model-value="getFechaCompra"
          append-inner-icon="mdi-calendar"
          @blur="($event: any) => setFechaCompra($event.target.value, 'text')">
          <v-menu activator="parent" :close-on-content-click="true">
            <v-date-picker
              color="primary"
              hideHeader
              :first-day-of-week="1"
              v-model="editData.fechaCompra"
              @update:model-value="($event: any) => setFechaCompra($event, 'date')">
            </v-date-picker>
          </v-menu>
        </v-text-field>
      </div>
      <div class="inputGroup">
        <combo-component
          ref="cboArticulos"
          :disabled="from.includes('articulo')"
          :tipo-dato="TipoDato.Articulos"
          v-model="editData.articulo"
          required
          :error-messages="v$.editData.articulo.$errors.map(e => e.$message)"
          @blur="v$.editData.articulo.$touch()"></combo-component>
      </div>
      <div class="inputGroup">
        <combo-component
          :tipo-dato="TipoDato.Establecimientos"
          v-model="editData.establecimiento"
          :return-object="false"
          required
          :error-messages="v$.editData.establecimiento.$errors.map(e => e.$message)"
          :validations="v$.editData.establecimiento"
          @blur="v$.editData.establecimiento.$touch()"></combo-component>
      </div>
      <div class="inputGroup">
        <v-text-field variant="underlined" label="Marca*" v-model="editData.marca"></v-text-field>
      </div>
      <div class="inputGroup">
        <v-text-field
          ref="inputPrecio"
          variant="underlined"
          label="Precio*"
          v-model="editData.precio"
          :hide-spin-buttons="true"
          max-width="120"
          @keypress="onKeypressPrecio"></v-text-field>
        <div v-if="editData.articulo">
          <div class="inputGroup">
            <v-text-field
              v-for="unidad in editData.unidadesMedida"
              type="number"
              class="text-capitalize"
              :label="pluralize(unidad.nombre, unidad.valor)"
              variant="underlined"
              :hide-spin-buttons="true"
              v-model="unidad.valor"
              max-width="100"></v-text-field>
          </div>
        </div>
      </div>
      <div class="inputGroup">
        <v-text-field variant="underlined" label="Notas" v-model="editData.notas"></v-text-field>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EditionToolbar from '@/components/EditionToolbar.vue'
  import { required, requiredIf } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { computed } from 'vue'
  import router from '@/router'
  import create from '@/services/precio/createPrecio.service'
  import update from '@/services/precio/updatePrecio.service'
  import getArticuloById from '@/services/articulo/getArticuloById.service'
  import type Articulo from '@/services/articulo/models/Articulo'
  import { dateToFront, isNumber, pluralize, StringToDate } from '@/utils/utils'
  import ComboComponent from '@/components/combos/ComboComponent.vue'
  import { TipoDato } from '@/services/desplegables/models/TipoDato'
  import { modelStore } from '@/main'

  // Data
  const adding = ref(false)
  const from = history.state.back
  const editData = reactive<any>(modelStore.precio ? modelStore.getPrecio : { borrable: true })
  if (!editData.id) {
    adding.value = true
  } else {
    editData.precio = editData.precio
      ? editData?.precio.toLocaleString('it-IT', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      : ''
  }

const isValidDate = (value: any) => {
  if (!value) return false
  if (typeof value === 'object' && value instanceof Date) {
    return !isNaN(value.getTime())
  }
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  if (regex.test(value)) {
    return !isNaN(new Date(StringToDate(value)).getTime())
  }
  return false
}

  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })

  const getFechaCompra = computed(() => {
    return dateToFront(editData!.fechaCompra)
  })

  const setFechaCompra = (value: any, type: string) => {
    if (type === 'date') {
      editData!.fechaCompra = value
    } else if (isValidDate(value)) {
      editData!.fechaCompra = StringToDate(value)
    }
  }

  // Watch para controlar cambios en editData.articulo y cargar unidades de medida
  watch(
    async () => {
      return editData?.articulo;
    },
    async () => {
      if (!editData?.id) {
        const response = await getArrayUnidadesMedida()
        editData!.unidadesMedida = response
      }
    }
  )

  // Validations
  const validations = computed(() => {
    const fechaCompraValid = (value: string) => {
      return value ? new Date(value).getTime() <= new Date().getTime() : false
    }
    return {
      editData: {
        id: { required: requiredIf(!adding.value) },
        articulo: { required },
        marca: { required },
        establecimiento: { required },
        precio: { required },
        fechaCompra: { required, fechaCompraValid },
        borrable: { required }
      }
    }
  })

  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { editData })

  onMounted(async () => {
    v$.value.editData.articulo.$reset
    v$.value.editData.establecimiento.$reset

    if (editData.articulo) {
      const response = await getArrayUnidadesMedida()
      editData!.unidadesMedida = response
    }
  })

  // Methods
  const onKeypressPrecio = (evt: any) => {
    if (!isNumber(evt.key)) {
      if (evt.charCode === 46) {
        evt.preventDefault()
        if (!evt.target.value.includes(',')) {
          evt.target.value = evt.target.value + ','
        }
      } else if (evt.charCode === 44) {
        if (evt.target.value.includes(',')) {
          evt.preventDefault()
        }
      } else {
        evt.preventDefault()
      }
    }
  }

  const getArrayUnidadesMedida = () => {
    return getArticuloById(editData!.articulo!.id).then(response => {
      const articulo = response.data as Articulo
      const tmpArray: any = []
      articulo.tiposUnidad.forEach(element => {
        const tmp: any = { ...element }
        tmp.valor = editData.unidadesMedida.find((um: any) => um.id === element.id)?.valor || 0
        tmpArray.push(tmp)
      })
      return tmpArray
    })
  }

  const onBack = () => {
    if (from.includes('articulo')) {
      // modelStore.setArticulo(null)
    } else {
      modelStore.setPrecio(null)
    }
    router.push(from)
  }

  const save = async () => {
    if (adding.value) {
      createPrecio(editData)
    } else {
      updateCompra(editData)
    }
  }

  const createPrecio = (data: any) => {
    create(data).then(() => {
      onBack()
    })
  }

  const updateCompra = (data: any) => {
    update(data).then(() => {
      onBack()
    })
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
    overflow: hidden;
  }
</style>
