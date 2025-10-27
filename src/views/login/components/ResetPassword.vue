<template>
  <div class="resetPassword_box">
    <div class="resetPassword_box-center">
      <div class="resetPassword_title">
        <label>Recuperar contraseña</label>
      </div>
      <div class="resetPassword_form">
        <form>
          <v-text-field
            v-model="username"
            class="input_form"
            placeholder="Usuario"
            :invalid="v$.username.$invalid"
            :dirty="v$.username.$dirty"
            :validations="v$.username"
            error-messages="errorMessages"
            error-help-text
            @blur="v$.username.$touch"
          />
        </form>
      </div>
      <div class="resetPassword_actions">
        <v-button color="secondary"
                  icon="angle-left"
                  @click="onBack"
        >
          Volver
        </v-button>
        <v-button @click="onSend">
          Enviar
        </v-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { computed, ref } from 'vue'

  const emitter = defineEmits(['back', 'send'])
  const username = ref('')
  // const errorMessages = {
  //   required: 'Este campo es obligatorio'
  // }
  const validations = computed(() => {
    username: {
      required
    }
  })
  const v$ = useVuelidate(validations, { username })

  const onBack = () => {
    emitter('back')
  }

  const onSend = () => {
    emitter('send', { username: username.value })
  }
</script>

<style lang="scss" scoped>
.resetPassword_box {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-center {
    display: flex;
    flex: 1;
    flex-direction: column;

    .resetPassword_title {
      flex: 1;
      font-size: 1.2rem;
      font-weight: 300;
      text-align: left;
    }

    .resetPassword_form {
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

    .resetPassword_actions {
      flex: 2;
      display: flex;
      justify-content: space-evenly;
      padding-top: 8px;
    }
  }
}
</style>
