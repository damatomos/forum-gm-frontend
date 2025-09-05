<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
</script>

<template>
  <div class="container-login">
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
    <p>Já possui uma conta? <a href="LoginView.vue">registre-se.</a></p>
  </div>
</template>

<style scoped lang="scss"></style>
