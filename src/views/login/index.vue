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
          @change-password="onViewChangePassword"
          @register="onViewRegister" />
        <change-password
          v-else-if="mode === 'changePassword'"
          @send="onChangePassword"
          @back="onBackToLogin" />
        <register-form
          v-else-if="mode === 'register'"
          @send="onRegister"
          @back="onBackToLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from './components/LoginForm.vue'
  import RegisterForm from './components/RegisterForm.vue'
  import ChangePassword from './components/ChangePassword.vue'

  import { onMounted, ref } from 'vue'
  import router from '@/router'
  import { authStore, uiStore } from '@/main'
  import getUsuarioPreferencias from '@/services/usuario/getUsuarioPreferencias.service'
  import getUsuarioByUsername from '@/services/usuario/getUsuarioByUsername.service'
  import Usuario from '@/services/usuario/models/Usuario'
import registrarUsuario from '@/services/auth/registrarUsuario.service'
import cambiarPassword from '@/services/auth/cambiarPassword.service'

  // const userName = ref('');
  const mode = ref('login')
  const isLoginError = ref(false)
  const loginErrorMessage = ref('')

  onMounted(() => {
    // if (authService.login.isAuth()) {
    //   authService.logout.logout();
    // }
    // if (!authService.login.isLoginApp()) {
    //   mode.value = 'sso';
    //   authService.login.login();
    // }
  })

  const onLogin = async ({ username, password }: { username: string; password: string }) => {
    uiStore.setMaskText('Iniciando sesión...')
    try {
      const login = await authStore.login(username, password)
      if (login) {
        getDatosUsuario()
        router.push('/')
      } else {
        isLoginError.value = true
      }
    } catch (error: any) {
      console.log(error)
      isLoginError.value = true
      loginErrorMessage.value =
        error.response?.data?.message || error.message || 'Error en el login'
    }
  }

  const getDatosUsuario = async () => {
    const usuario = (await getUsuarioByUsername(authStore.getUsuarioLogueado.username))
      .data as Usuario
    getUsuarioPreferencias(usuario.id).then((response: any) => {
      console.log(response.data)
    })
  }

  const onChangePassword = ({ username, newPassword }: { username: string, newPassword: string }): void => {

    cambiarPassword(username, newPassword).then(() => {
      mode.value = 'login'
    }).catch((error) => {
      console.error('Error al cambiar la contraseña:', error)
    })
  }

  const onRegister = ({username, email, password }: {username: string, email: string, password: string}) => {
    registrarUsuario(username, email, password).then(() => {
      mode.value = 'login'
    }).catch((error) => {
      console.error('Error al registrar el usuario:', error)
    })
  }

  const onViewChangePassword = () => {
    mode.value = 'changePassword'
  }

  const onViewRegister = () => {
    mode.value = 'register'
  }

  const onBackToLogin = (): void => {
    mode.value = 'login'
  }
</script>

<style src="./styles.scss" lang="scss" scoped />
