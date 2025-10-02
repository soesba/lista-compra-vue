<template>
  <div class="login_box">
    <div class="login_title">
      <label>Login</label>
    </div>
    <div class="login_form">
      <form>
        <v-text-field
          v-model="username"
          class="input_form text"
          placeholder="Nombre de usuario"
          :invalid="v$.username.$invalid"
          :dirty="v$.username.$dirty"
          :validations="v$.username"
          error-help-text
          :error-messages="v$.username.$errors.map((e) => e.$message.toString())"
          @blur="v$.username.$touch"
          @keypress.native.enter="onLogin" />
        <v-text-field
          v-model="password"
          class="input_form text"
          placeholder="Contraseña"
          :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          :invalid="v$.password.$invalid"
          :dirty="v$.password.$dirty"
          :validations="v$.password"
          error-help-text
          :error-messages="v$.password.$errors.map((e) => e.$message.toString())"
          @click:append-inner="showPass = !showPass"
          @blur="v$.password.$touch"
          @keypress.native.enter="onLogin" />
      </form>
      <span v-if="authError" class="login_error">{{ authErrorMessage }}</span>
    </div>
    <div class="login_actions">
      <div class="button_submit">
        <v-btn color="primary" raised :disabled="btnLoginDisabled" @click="onLogin()">Login</v-btn>
      </div>
      <div class="password_recovery" v-if="false">
        <label raised color="primary" @click="onChangePassword()" href=""
          >Cambiar contraseña</label
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import useVuelidate from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { computed, defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'LoginForm',
  });
</script>
<script setup lang="ts">
  const emitter = defineEmits(['login', 'changePassword']);
  defineProps({
    authError: Boolean,
    authErrorMessage: {
      type: String,
      default: '',
    },
  });

  const username = ref('');
  const password = ref('');
  const showPass = ref(false);

  const btnLoginDisabled = computed(() => {
    return v$.value.$invalid;
  });

  // Validations
  const validations = computed(() => {
    return {
      username: {
        required,
      },
      password: {
        required,
      },
    };
  });
  // Use the "useVuelidate" function to perform form validation
  const v$ = useVuelidate(validations, { username, password });

  const onLogin = () => {
    v$.value.$touch();

    if (v$.value.$invalid) {
      return;
    }
    emitter('login', {
      username: username.value,
      password: password.value,
    });
  };

  const onChangePassword = () => {
    emitter('changePassword');
  };
</script>

<style lang="scss" scoped>
  .login_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .login_title {
      flex: 1;
      font-size: 1.2rem;
    }

    .login_form {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 3;
      margin-top: 8px;
      form {
        width: 100%;
      }
      .login_error {
        color: red;
        font-size: 0.8em;
      }
    }
    .password_recovery {
      label {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .login_actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 2;
      padding-top: 8px;
      gap: 8px;
    }
  }
</style>
