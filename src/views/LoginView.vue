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
    <InputComponent
      class="input-senha"
      label="Password"
      type="password"
      variant="auth"
      id="password-login"
    />
    <ButtonSimpleComponent class="btn-login" variant="button-auth" content="Entrar" />
    <p>Não possui uma conta? <a href="RegisterView.vue">registre-se.</a></p>
  </div>
</template>

<style scoped lang="scss"></style>
