<template>
  <div class="changePassword_box">
    <div class="changePassword_box-center">
      <div class="changePassword_title">
        Cambiar contraseña
        <hr>
      </div>
      <div class="changePassword_form">
        <form>
          <v-text-field
            v-model="currentPassword"
            class="input_form"
            label="Contraseña actual"
            password
            error-help-text
            :invalid="v$.currentPassword.$invalid"
            :dirty="v$.currentPassword.$dirty"
            :validations="v$.currentPassword"
            error-messages="errorMessages"
            @blur="v$.currentPassword.$touch"
          />
          <v-text-field
            v-model="newPassword"
            class="input_form"
            label="Contraseña nueva"
            password
            error-help-text
            :invalid="v$.newPassword.$invalid"
            :dirty="v$.newPassword.$dirty"
            :validations="v$.newPassword"
            error-messages="errorMessages"
            @blur="v$.newPassword.$touch"
          />
          <v-text-field
            v-model="repeatPassword"
            class="input_form"
            label="Repita la nueva contraseña"
            password
            error-help-text
            :invalid="v$.repeatPassword.$invalid"
            :dirty="v$.repeatPassword.$dirty"
            :validations="v$.repeatPassword"
            error-messages="errorMessages"
            @blur="v$.repeatPassword.$touch"
          />
        </form>
      </div>
      <div class="changePassword_actions">
        <v-btn variant="text" color="secondary"
                  icon="angle-left"
                  @click="onBack"
        >
          Volver
        </v-btn>
        <v-btn @click="onSend">
          Aceptar
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core'
import { defineComponent, computed, ref } from 'vue'
import { required, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'ChangePassword'
})

</script>
<script setup lang="ts">
  const emitter = defineEmits(['back', 'send'])
  const currentPassword = ref('')
  const newPassword = ref('')
  const repeatPassword = ref('')
  const errorMessages = {
    required:  'Este campo es obligatorio',
    sameAsPassword: 'Las contraseñas no coinciden'
  }
  const validations = computed(() => {
    return {
      currentPassword: { required },
      newPassword: { required },
      repeatPassword: { required, sameAsPassword: sameAs('newPassword') }
    }
  })
const v$ = useVuelidate(validations, { currentPassword, newPassword, repeatPassword })

const onBack = () => {
      emitter('back')
    }

const onSend = () =>{
      v$.value.$touch()

      if (v$.value.$invalid) {
        return
      }

      emitter('send', { currentPassword: currentPassword.value, newPassword: newPassword.value })
    }
</script>

<style lang="scss" scoped>
.changePassword_box {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-center {
    display: flex;
    flex: 1;
    flex-direction: column;

    .changePassword_title {
      flex: 1;
      font-size: 18px;
      text-align: left;
    }

    .changePassword_form {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 3;
      margin-top: 8px;

      form {
        width: 100%;
      }

      .input_form {
         margin: 4px 0 4px 0;
      }
    }

    .changePassword_actions {
      flex: 2;
      display: flex;
      justify-content: space-evenly;
      padding-top: 8px;
    }
  }
}
</style>
