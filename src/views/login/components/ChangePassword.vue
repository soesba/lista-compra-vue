<template>
  <div class="changePassword_box">
      <div class="changePassword_title">
        <label>Cambiar contraseña</label>
      </div>
      <div class="changePassword_form">
        <form>
          <v-text-field
            v-model="username"
            class="input_form"
            placeholder="Nombre de usuario"
            autocomplete="username"
            :invalid="v$.username.$invalid"
            :dirty="v$.username.$dirty"
            :validations="v$.username"
            :error-messages="v$.username.$errors.map((e) => e.$message.toString())"
            error-help-text
            @blur="v$.username.$touch"
          />
          <v-text-field
          v-model="newPassword"
          class="input_form"
          placeholder="Nueva contraseña"
          :type="showPass ? 'text' : 'password'"
          autocomplete="new-password"
          error-help-text
          :invalid="v$.newPassword.$invalid"
          :dirty="v$.newPassword.$dirty"
          :validations="v$.newPassword"
          :error-messages="v$.newPassword.$errors.map((e: any) => e.$message.toString())"
          :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPass = !showPass"
          @blur="v$.newPassword.$touch"
          @keypress.native.enter="onSend" />
        </form>
      </div>
      <div class="changePassword_actions">
        <v-btn color="secondary"
            @click="onBack"
        >
          Volver
        </v-btn>
        <v-btn color="primary" @click="onClickEnviar" :disabled="btnDisabled">
          Enviar
        </v-btn>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { uiStore } from '@/main'
import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { computed, ref } from 'vue'

  const emitter = defineEmits(['back', 'send'])
  const username = ref('')
  const newPassword = ref('')
  const showPass = ref(false)
  const validations = computed(() => {
    return {
      username: {
        required
      },
      newPassword: {
        required
      }
    }
  })
  const v$ = useVuelidate(validations, { username, newPassword })

  const btnDisabled = computed(() => {
    return v$.value.$invalid
  })

  const onBack = () => {
    emitter('back')
  }

  const onClickEnviar = () => {
    uiStore.showConfirmDialog({
      props: {
        title: 'Confirmación',
        text: '¿Está seguro que desea cambiar la contraseña?'
      },
      aceptarFn: () => {
        onSend()
      }
    })
  }

  const onSend = () => {
    emitter('send', { username: username.value, newPassword: newPassword.value })
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
      font-size: 1.2rem;
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
      .error {
        color: red;
        font-size: 0.8em;
      }
    }

    .changePassword_actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 2;
      padding-top: 8px;
      gap: 8px;
    }
  }
</style>
