<template>
  <edition-toolbar @onBack="onBack" @onSave="save" :saveDisabled="!canSave" />
  <div class="form" v-if="editData">
    <div class="body">
      <div class="inputGroup">
        <v-text-field
          variant="underlined"
          label="Nombre*"
          required
          v-model="editData.nombre"
          :error-messages="v$.editData.nombre.$errors.map(e => e.$message.toString())"
          @blur="v$.editData.nombre.$touch"
          @input="v$.editData.nombre.$touch"></v-text-field>
      </div>
      <div class="inputGroup">
        <v-text-field variant="underlined" label="Descripción" v-model="editData.descripcion"></v-text-field>
      </div>
      <div class="inputGroup">
        <v-checkbox
          label="Protección contra borrado accidental"
          v-model="editData.borrable"
          :true-value="false"
          :false-value="true"></v-checkbox>
      </div>
      <div class="inputGroup">
        <combo-component
          :tipo-dato="TipoDato.TipoUnidad"
          v-model="editData.tiposUnidad"
          label="Unidades de medida (máx 2)"
          required
          multiple
          :error-messages="v$.editData.tiposUnidad.$errors.map((e: any) => e.$message)"
          @blur="v$.editData.tiposUnidad.$touch()"
          @update:model-value="onChange">
        </combo-component>
      </div>
      <span class="text-small secondary">{{ messageHelperTiposUnidad }}</span>
      <div v-if="editData.id">
        <div class="inputGroup">
          <label class="labelFor">Histórico de precios</label>
        </div>
        <HistoricoPrecios :precios="editData.precios" :editable="true" :articulo="editData"></HistoricoPrecios>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ComboComponent from '@/components/combos/ComboComponent.vue'
  import EditionToolbar from '@/components/EditionToolbar.vue'
  import { required, requiredIf } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { TipoDato } from '@/services/desplegables/models/TipoDato'
  import { reactive, ref } from 'vue'
  import { computed } from 'vue'
  import router from '@/router'
  import { eventStore, modelStore } from '@/main'
  import create from '@/services/articulo/createArticulo.service'
  import update from '@/services/articulo/updateArticulo.service'
  import HistoricoPrecios from '@/components/HistoricoPrecios.vue'
  import Articulo from '@/services/articulo/models/Articulo'
  import Precio from '@/services/precio/models/Precio'
  import updateUnidadesMedidaPrecio from '@/services/precio/updateUnidadesMedidaPrecio.service'
import getByArticuloId from '@/services/precio/getPreciosByArticuloId.service'

  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid && v$.value.editData.$anyDirty
  })

  // Data
  const from = history.state.back
  const adding = ref(false)
  const originalData = modelStore.getArticulo ? { ...modelStore.getArticulo } : null
  const editData = reactive<any>(modelStore.getArticulo ? { ...modelStore.getArticulo} : { borrable: true })
  if (!editData.id) {
    adding.value = true
  }
  if (from.includes('precio-edicion')) {
    // Si venimos de la edición de un precio, recargamos los precios asociados al artículo
    editData.precios = (await getByArticuloId(editData.id)).data
  }
  const unidadesBorradas = ref<any[]>([])
  // Validations
  const validations = computed(() => {
    const maxTiposUnidad = (value: any) => {
      return value.length <= 2
    }
    return {
      editData: {
        id: { required: requiredIf(!adding) },
        nombre: { required },
        descripcion: {},
        tiposUnidad: { required, maxTiposUnidad },
        borrable: { required }
      }
    }
  })
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { editData })

  // Methods
  const messageHelperTiposUnidad = ref()
  const onChange = (event: any) => {
    if (originalData) {
      originalData.tiposUnidad.map((tipoUnidad: any) => {
        if (!event.find((tipoUnidadItem: any) => tipoUnidadItem.id === tipoUnidad.id)) {
          // Tipo unidad borrada
          unidadesBorradas.value.push(tipoUnidad)
        }
      })
      if (unidadesBorradas.value.length > 0) {
        messageHelperTiposUnidad.value = `Las unidades de medida ${unidadesBorradas.value.map((u: any) => u.nombre).join(', ')}
         serán eliminadas. Si existen precios asociados únicamente a estas unidades, también serán eliminados.`
      } else {
        messageHelperTiposUnidad.value = ''
      }
    }
    v$.value.editData.tiposUnidad.$touch()
  }

  const onBack = () => {
    modelStore.setArticulo(null)
    if (adding.value) {
      router.push(eventStore.routes.list)
    } else {
      router.push(`${eventStore.routes.detail}/${editData.id}`)
    }
  }

  const save = async () => {
    delete editData.tmpId
    if (adding.value) {
      createArticulo(editData)
    } else {
      if (unidadesBorradas.value.length > 0) {
        const preciosAfectados = editData.precios.filter((precio: any) => {
          return unidadesBorradas.value.find((u: any) => {
            return precio.unidadesMedida.find((um: any) => um.id === u.id)
          })
        })
        preciosAfectados.forEach((precio: any) => {
          precio.unidadesMedida = precio.unidadesMedida.filter((um: any) => {
            return !unidadesBorradas.value.find((u: any) => u.id === um.id)
          })
        })
        preciosAfectados.forEach((precio: Precio) => {
          updateUnidadesMedidaPrecio(precio.id, precio.unidadesMedida).then(response => {
            console.log('LOG~ ~ :145 ~ save ~ response:', response)
          })
        })
      }
      editData.precios.unidadesMedida = editData.precios.unidadesMedida.filter((um: any) => {
        return !unidadesBorradas.value.find((u: any) => u.id === um.id)
      })
      updateArticulo(editData)
    }
  }

  const createArticulo = (data: any) => {
    create(data).then(response => {
      editData.id = (response.data as Articulo).id
      onBack()
    })
  }

  const updateArticulo = (data: any) => {
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
