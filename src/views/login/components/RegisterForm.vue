<template>
  <div class="register_box">
    <div class="register_title">
      Registro
    </div>
    <div class="register_form">
      <form>
        <v-text-field
          v-model="username"
          class="input_form text"
          placeholder="Nombre de usuario"
          :invalid="v$.username.$invalid"
          autocomplete="username"
          :dirty="v$.username.$dirty"
          :validations="v$.username"
          :error-messages="v$.username.$errors.map((e) => e.$message.toString())"
          error-help-text
          @blur="v$.username.$touch"
          @keypress.native.enter="onSend" />
        <v-text-field
          v-model="email"
          class="input_form"
          placeholder="Correo electrónico"
          autocomplete="email"
          error-help-text
          :invalid="v$.email.$invalid"
          :dirty="v$.email.$dirty"
          :validations="v$.email"
          :error-messages="v$.email.$errors.map((e) => e.$message.toString())"
          @blur="v$.email.$touch"
          @keypress.native.enter="onSend" />
        <v-text-field
          v-model="password"
          class="input_form"
          label="Contraseña nueva"
           :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          autocomplete="new-password"
          error-help-text
          :invalid="v$.password.$invalid"
          :dirty="v$.password.$dirty"
          :validations="v$.password"
          :error-messages="v$.password.$errors.map((e) => e.$message.toString())"
           @click:append-inner="showPass = !showPass"
          @blur="v$.password.$touch"
          @keypress.native.enter="onSend" />
      </form>
    </div>
    <div class="register_actions">
      <v-btn color="secondary" @click="onBack"> Volver </v-btn>
      <v-btn color="primary" @click="onSend" :disabled="btnDisabled"> Aceptar </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVuelidate from '@vuelidate/core'
  import { computed, ref } from 'vue'
  import { required } from '@vuelidate/validators'

  const emitter = defineEmits(['back', 'send'])
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const showPass = ref(false)

  const validations = computed(() => {
    return {
      username: { required },
      email: { required },
      password: { required }
    }
  })
  const v$ = useVuelidate(validations, { username, email, password })

  const btnDisabled = computed(() => {
    return v$.value.$invalid
  })

  const onBack = () => {
    emitter('back')
  }

  const onSend = () => {
    v$.value.$touch()

    if (v$.value.$invalid) {
      return
    }

    emitter('send', { username: username.value, email: email.value, password: password.value })
  }
</script>

<style lang="scss" scoped>
  .register_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .register_title {
      flex: 1;
      font-size: 18px;
    }

    .register_form {
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

    .register_actions {
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
