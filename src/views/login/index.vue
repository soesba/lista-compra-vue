<template>
  <div class="auth">
    <div class="auth_title">
      <h1>Precios de la compra</h1>
    </div>
    <div class="auth_box">
      <div class="auth_box-content">
        <login-form
          v-if="mode === 'login'"
          :auth-error="isLoginError"
          :auth-error-message="loginErrorMessage"
          @login="onLogin"
          @change-password="onViewChangePassword" />
        <!-- <reset-password
          v-else-if="mode === 'resetPassword'"
          @send="onResetPassword"
          @back="onBackToLogin" /> -->
        <change-password
          v-else-if="mode === 'changePassword'"
          @send="onChangePassword"
          @back="onBackToLogin" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import LoginForm from './components/LoginForm.vue';
  import ChangePassword from './components/ChangePassword.vue';

  import { defineComponent, onMounted, ref } from 'vue';
  import router from '@/router';
  import { authStore } from '@/main';

  export default defineComponent({
    name: 'LoginTemplate',
  });
</script>
<script setup lang="ts">
  // const userName = ref('');
  const mode = ref('login');
  const isLoginError = ref(false);
  const loginErrorMessage = ref('');

  onMounted(() => {
    // if (authService.login.isAuth()) {
    //   authService.logout.logout();
    // }
    // if (!authService.login.isLoginApp()) {
    //   mode.value = 'sso';
    //   authService.login.login();
    // }
  });

  const onLogin = async ({ username, password }: { username: string; password: string }) => {
    try {
      const login = await authStore.login(username, password);
      if (login) {
        router.push('/');
      } else {
        isLoginError.value = true;
      }
    } catch (error: any) {
      console.log(error);
      isLoginError.value = true;
      loginErrorMessage.value = error.response?.data?.message || 'Error en el login';
    }
  };

  // const onResetPassword = ({ username }: { username: string }): void => {
  //   userName.value = username;

  //   resetPasswordService.execute(username).then(() => {
  //       mode.value = 'changePassword';
  //     })
  //     .catch(() => {
  //       // INCLUIR ACCIÓN DE FALLO
  //       alert('Error en el reseteo de password');
  //     });
  // };

  const onChangePassword = ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    console.log(
      'LOG~ ~ :82 ~ onChangePassword ~ currentPassword, newPassword:',
      currentPassword,
      newPassword
    );
    // changePasswordService.execute(userName.value, currentPassword, newPassword).then(() => {
    //   alert('Contraseña cambiada');
    //   mode.value = 'login';
    // })
    // .catch(() => {
    //   alert('Error al cambiar la contraseña');
    // });
  };

  const onViewChangePassword = () => {
    mode.value = 'changePassword';
  };

  const onBackToLogin = (): void => {
    mode.value = 'login';
  };
</script>

<style src="./styles.scss" lang="scss" scoped />
