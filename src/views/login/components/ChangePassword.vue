<template>
  <div class="changePassword_box">
    <div class="changePassword_title">
      Cambiar contraseña
      <hr />
    </div>
    <div class="changePassword_form">
      <form>
        <v-text-field
          v-model="username"
          class="input_form text"
          placeholder="Nombre de usuario"
          :invalid="v$.username.$invalid"
          :dirty="v$.username.$dirty"
          :validations="v$.username"
          :error-messages="v$.username.$errors.map((e) => e.$message.toString())"
          error-help-text
          @blur="v$.username.$touch"
          @keypress.native.enter="onSend" />
        <v-text-field
          v-model="currentPassword"
          class="input_form"
          label="Contraseña actual"
          password
          error-help-text
          :invalid="v$.currentPassword.$invalid"
          :dirty="v$.currentPassword.$dirty"
          :validations="v$.currentPassword"
          :error-messages="v$.currentPassword.$errors.map((e) => e.$message.toString())"
          @blur="v$.currentPassword.$touch"
          @keypress.native.enter="onSend" />
        <v-text-field
          v-model="newPassword"
          class="input_form"
          label="Contraseña nueva"
          password
          error-help-text
          :invalid="v$.newPassword.$invalid"
          :dirty="v$.newPassword.$dirty"
          :validations="v$.newPassword"
          :error-messages="v$.newPassword.$errors.map((e) => e.$message.toString())"
          @blur="v$.newPassword.$touch"
          @keypress.native.enter="onSend" />
        <v-text-field
          v-model="repeatPassword"
          class="input_form"
          label="Repita la nueva contraseña"
          password
          error-help-text
          :invalid="v$.repeatPassword.$invalid"
          :dirty="v$.repeatPassword.$dirty"
          :validations="v$.repeatPassword"
          :error-messages="v$.repeatPassword.$errors.map((e) => e.$message.toString())"
          @blur="v$.repeatPassword.$touch"
          @keypress.native.enter="onSend" />
      </form>
    </div>
    <div class="changePassword_actions">
      <v-btn color="secondary" @click="onBack"> Volver </v-btn>
      <v-btn color="primary" @click="onSend"> Aceptar </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVuelidate from '@vuelidate/core'
  import { computed, ref } from 'vue'
  import { required, sameAs } from '@vuelidate/validators'

  const emitter = defineEmits(['back', 'send'])
  const username = ref('')
  const currentPassword = ref('')
  const newPassword = ref('')
  const repeatPassword = ref('')
  // const errorMessages = {
  //   required: 'Este campo es obligatorio',
  //   sameAsPassword: 'Las contraseñas no coinciden'
  // }
  const validations = computed(() => {
    return {
      username: { required },
      currentPassword: { required },
      newPassword: { required },
      repeatPassword: { required, sameAsPassword: sameAs(newPassword) }
    }
  })
  const v$ = useVuelidate(validations, { username, currentPassword, newPassword, repeatPassword })

  const onBack = () => {
    emitter('back')
  }

  const onSend = () => {
    v$.value.$touch()

    if (v$.value.$invalid) {
      return
    }

    emitter('send', { username: username.value, currentPassword: currentPassword.value, newPassword: newPassword.value })
  }
</script>

<style lang="scss" scoped>
  .changePassword_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .changePassword_title {
      flex: 1;
      font-size: 18px;
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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      flex: 2;
      padding-top: 8px;
      gap: 8px;
    }
  }
</style>
