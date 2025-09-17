<script setup lang="ts">
import BackgroundComponent from '@/components/BackgroundComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    nome: yup
      .string()
      .min(4, 'Requer ao menos 4 caracteres')
      .required('Nome é um campo obrigatório'),
    email: yup
      .string()
      .email('O e-mail deve ser um e-mail válido')
      .required('Email é um campo obrigatório'),
    password: yup
      .string()
      .matches(/^(?=.*\d).*$/, 'deve conter ao menos um número')
      .matches(/^(?=.*[a-z]).*$/, 'deve conter ao menos uma letra minúscula')
      .matches(/^(?=.*[A-Z]).*$/, 'deve conter ao menos uma letra maiúscula')
      .matches(/^(?=.*[$*&@#.]).*$/, 'deve conter ao menos um caractere especial')
      .matches(/^[0-9a-zA-Z$*&@#.]{8,}$/, 'deve conter ao menos 8 caracteres')
      .required('Senha é um campo obrigatório'),
  }),
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false })
const [nome, nomeAttrs] = defineField('nome', { validateOnModelUpdate: false })

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <BackgroundComponent />
  <div class="container">
    <div class="container-register">
      <h1>Registre-se</h1>
      <InputComponent
        v-model="nome"
        v-bind="nomeAttrs"
        label="Nome"
        type="text"
        variant="auth"
        placeholder="Seu nome"
        id="nome-register"
      />
      <span class="error nome">{{ errors.nome }}</span>

      <InputComponent
        v-model="email"
        v-bind="emailAttrs"
        label="Email"
        type="email"
        variant="auth"
        placeholder="Seu melhor email"
        id="email-register"
      />
      <span class="error email">{{ errors.email }}</span>

      <InputComponent
        v-model="password"
        v-bind="passwordAttrs"
        label="Senha"
        type="Senha"
        variant="auth"
        id="password-register"
      />
      <span class="error password">{{ errors.password }}</span>

      <ButtonSimpleComponent
        @click="onSubmit"
        class="btn-login"
        variant="button-auth"
        content="Cadastrar"
      />
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
    position: relative;
    h1 {
      @include text-center-white;
      font-size: $font-size-5xl;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .error {
      color: $gm-c-red;
      position: absolute;
      padding-left: 8px;
      top: 0;
      &.nome {
        top: 232px;
      }
      &.email {
        top: 330px;
      }
      &.password {
        top: 425px;
      }
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
