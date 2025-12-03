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
      <div v-if="showCheckDatoMaestro" class="inputGroup">
        <v-checkbox label="Dato maestro" v-model="editData.esMaestro"></v-checkbox>
      </div>
      <div class="inputGroup">
        <v-text-field
          variant="underlined"
          label="Nombre*"
          required
          v-model="editData.nombre"
          :error-messages="v$.editData.nombre.$errors.map(e => e.$message.toString())"
          @blur="v$.editData.nombre.$touch"
          @input="v$.editData.nombre.$touch">
        </v-text-field>
      </div>
      <div class="inputGroup">
        <v-text-field
          variant="underlined"
          label="Abreviatura*"
          required
          v-model="editData.abreviatura"
          :error-messages="v$.editData.abreviatura.$errors.map(e => e.$message.toString())"
          @blur="v$.editData.abreviatura.$touch"
          @input="v$.editData.abreviatura.$touch">
        </v-text-field>
      </div>
      <div class="inputGroup">
        <label class="labelFor">Equivalencias</label>
      </div>
      <div class="inputGroup">
        <label v-if="editData.equivalencias?.length === 0"> No hay equivalencias </label>
      </div>
      <div class="inputGroup margin-top-bottom">
        <label>1 {{ editData.nombre }} equivale a </label>
      </div>
      <equivalencia-component
        v-for="equivalencia in editData.equivalencias"
        v-bind:key="equivalencia.id || equivalencia.tmpId"
        :equivalencia="equivalencia"
        @update-equivalencia="onUpdateEquivalencia"
        @delete-equivalencia="onDeleteEquivalencia">
      </equivalencia-component>
      <equivalencia-component :from="from" @save-equivalencia="onSaveEquivalencia" />
      <div class="inputGroup">
        <small class="text-caption text-medium-emphasis">*campo requerido</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { computed } from 'vue'
  import router from '@/router'
  import EditionToolbar from '@/components/EditionToolbar.vue'
  import EquivalenciaComponent from '@/components/EquivalenciaComponent.vue'
  import type Equivalencia from '@/services/equivalencia/models/Equivalencia'
  import { required, requiredIf } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { authStore, modelStore } from '@/main'
  import create from '@/services/tipoUnidad/createTipoUnidad.service'
  import update from '@/services/tipoUnidad/updateTipoUnidad.service'

  // Computed
  const canSave = computed(() => {
    return !v$.value.$invalid
  })

  const showCheckDatoMaestro = computed(() => {
    return authStore.usuario.esAdministrador
  })
  // Data
  const adding = ref(false)
  const editData = reactive<any>(modelStore.getTipoUnidad ? modelStore.getTipoUnidad : { borrable: true })
  if (!editData.id) {
    adding.value = true
  }
  if (editData.equivalencias == null) {
    editData.equivalencias = []
  }
  const from = ref({
    id: editData.id,
    nombre: editData.nombre
  })

  // Validations
  const validations = computed(() => {
    return {
      editData: {
        id: { required: requiredIf(!adding.value) },
        nombre: { required },
        abreviatura: { required },
        borrable: { required }
      }
    }
  })
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { editData })

  // Methods

  const onUpdateEquivalencia = (data: Equivalencia) => {
    editData.equivalencias.forEach((eq: Equivalencia, index: number) => {
      if ((data.id && eq.id === data.id) || (data.tmpId && eq.tmpId === data.tmpId)) {
        editData.equivalencias[index] = data
      }
    })
  }

  const onSaveEquivalencia = (data: Equivalencia) => {
    if (!data.tmpId) {
      data.tmpId = Date.now()
    }
    editData.equivalencias.push(data)
  }

  const onDeleteEquivalencia = (data: Equivalencia) => {
    const idDelete = data.id ? data.id : data.tmpId
    editData.equivalencias.splice(editData.equivalencias.findIndex((eq: Equivalencia) => eq.id === idDelete), 1)
  }

  const save = () => {
    if (adding.value) {
      create(editData).then((response: any) => {
        if (response.respuesta === 200) {
          onBack()
        }
      }).catch((error: any) => {
        console.error('Error al crear la unidad de medida:', error)
      })
    } else {
      update(editData).then((response: any) => {
        if (response.respuesta === 200) {
          onBack()
        }
      }).catch((error: any) => {
        console.error('Error al actualizar la unidad de medida:', error)
      })
    }
  }

  const onBack = () => {
    modelStore.setTipoUnidad(null)
    router.back()
  }
</script>
<style lang="scss" scoped></style>
