<template>
  <edition-toolbar @onBack="onBack" @onSave="save" :saveDisabled="!canSave" />
  <div class="form" v-if="editData">
    <div class="body">
      <div class="inputGroup">
        <v-checkbox
          label="Protección contra borrado accidental"
          :model-value="!editData.borrable"></v-checkbox>
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { computed } from 'vue'
  import EditionToolbar from '@/components/EditionToolbar.vue'
  import router from '@/router'
  import { required, requiredIf } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { authStore, eventStore, modelStore } from '@/main'
  import create from '@/services/tipoEstablecimiento/createTipoEstablecimiento.service'
  import update from '@/services/tipoEstablecimiento/updateTipoEstablecimiento.service'

  // Computed
  const showCheckDatoMaestro = computed(() => {
    return authStore.usuario.esAdministrador
  })

  const canSave = computed(() => {
    return !v$.value.$invalid
  })

  // Data
  const adding = ref(false)
  const editData = reactive<any>(
    modelStore.getTipoEstablecimiento ? modelStore.getTipoEstablecimiento : { borrable: true }
  )
  if (!editData.id) {
    adding.value = true
  }
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

  const save = () => {
    if (adding.value) {
      createTipoEstablecimiento(editData)
    } else {
      updateTipoEstablecimiento(editData)
    }
  }

  const onBack = () => {
    modelStore.setTipoEstablecimiento(null)
    if (adding.value) {
      router.push(eventStore.getRoutes.list)
    } else {
      router.push(`${eventStore.getRoutes.detail}/${editData.id}`)
    }
  }

  const createTipoEstablecimiento = (data: any) => {
    create(data).then(() => {
      onBack()
    })
  }

  const updateTipoEstablecimiento = (data: any) => {
    update(data).then(() => {
      onBack()
    })
  }
</script>
<style lang="scss" scoped></style>
