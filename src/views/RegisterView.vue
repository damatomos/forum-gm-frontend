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
      .matches(/^[0-9a-zA-Z$*&@#.]{8,}.*$/, 'deve conter ao menos 8 caracteres')
      .matches(/^(?=.*\d).*$/, 'deve conter ao menos um número')
      .matches(/^(?=.*[a-z]).*$/, 'deve conter ao menos uma letra minúscula')
      .matches(/^(?=.*[A-Z]).*$/, 'deve conter ao menos uma letra maiúscula')
      .matches(/^(?=.*[$*&@#.]).*$/, 'deve conter ao menos um caractere especial')
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
      <div class="container-name">
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
      </div>

      <div class="container-email">
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
      </div>

      <div class="container-password">
        <InputComponent
          v-model="password"
          v-bind="passwordAttrs"
          label="Senha"
          type="password"
          variant="auth"
          id="password-register"
        />
        <span class="error password">{{ errors.password }}</span>
      </div>

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

  &-register {
    @include style-login-and-register;
    position: relative;
    h1 {
      @include text-center-white;
      font-size: $font-size-5xl;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .error {
      font-size: $font-size-base;
      display: inline-block;
      color: $gm-c-red;
      margin-left: 8px;
    }

    .btn-login {
      margin-bottom: 1rem;
    }

    p {
      @include link-login-and-register;
    }
  }

  &-name,
  &-email {
    margin-bottom: 0.375rem;
  }

  &-password {
    margin-bottom: 1.875rem;
  }

  @include media('tablet') {
    &-register {
      h1 {
        font-size: $font-size-4xl;
        margin-bottom: 1.25rem;
      }
      .error {
        font-size: $font-size-sm;
      }
    }
    &-name,
    &-email {
      margin-bottom: 0;
    }
    &-password {
      margin-bottom: 1.25rem;
    }
  }
  @include media('mobile') {
    &-register {
      h1 {
        font-size: $font-size-3xl;
        margin-bottom: 1rem;
      }
      .error {
        font-size: $font-size-xs;
      }
    }
    &-name,
    &-email {
      margin-bottom: 0;
    }
    &-password {
      margin-bottom: 1.25rem;
    }
  }
}
</style>
