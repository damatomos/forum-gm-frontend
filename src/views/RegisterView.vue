<script setup lang="ts">
import BackgroundComponent from '@/components/BackgroundComponent.vue';
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
</script>

<template>
  <BackgroundComponent />
  <div class="container">
    <div class="container-register">
      <h1>Registre-se</h1>
      <InputComponent
        label="Nome"
        type="text"
        variant="auth"
        placeholder="Seu nome"
        id="nome-register"
      />
      <InputComponent
        label="Email"
        type="email"
        variant="auth"
        placeholder="Seu melhor email"
        id="email-register"
      />
      <InputComponent
        label="Password"
        type="password"
        variant="auth"
        placeholder=""
        id="password-register"
      />
      <ButtonSimpleComponent class="btn-login" variant="button-auth" content="Cadastrar" />
      <p>Já possui uma conta? <router-link to="/login">clique aqui.</router-link></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  @include flex-center;

  .container-register {
    @include style-login-and-register;
    h1 {
      @include text-center-white;
      font-size: $font-size-5xl;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    :deep(#nome-register),
    :deep(#email-register) {
      margin-bottom: 1.5rem;
    }

    :deep(#password-register) {
      margin-bottom: 3rem;
    }

    .btn-login {
      margin-bottom: 1rem;
    }

    p {
      @include link-login-and-register;
    }
  }
}
</style>
