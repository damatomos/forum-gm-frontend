<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
</script>

<template>
  <div class="container-login">
    <h1>Login</h1>
    <InputComponent
      label="Email"
      type="email"
      variant="auth"
      placeholder="Seu melhor email"
      id="email-login"
    />
    <InputComponent label="Password" type="password" variant="auth" id="password-login" />
    <ButtonSimpleComponent class="btn-login" variant="button-auth" content="Entrar" />
    <p>Não possui uma conta? <a href="RegisterView.vue">registre-se.</a></p>
  </div>
</template>

<style scoped lang="scss">
.container-login {
  @include style-login-and-register;

  h1 {
    @include text-center-white;
    font-size: $font-size-5xl;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  :deep(#email-login) {
    margin-bottom: 1.5rem;
  }

  :deep(#password-login) {
    margin-bottom: 3rem;
  }

  .btn-login {
    margin-bottom: 1rem;
  }

  p {
    @include link-login-and-register;
  }
}
</style>
