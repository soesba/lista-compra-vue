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
          @change="onChange"></combo-component>
      </div>
      <div class="inputGroup">
        <label class="labelFor">Histórico de precios</label>
      </div>
      <HistoricoPrecios :precios="editData.precios" :editable="true"></HistoricoPrecios>
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

  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })

  // Data
  const adding = ref(false)
  const editData = reactive<any>(modelStore.getArticulo ? modelStore.getArticulo : { borrable: true })
  if (!editData.id) {
    adding.value = true
  }

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
  const onChange = (event: any) => {
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
