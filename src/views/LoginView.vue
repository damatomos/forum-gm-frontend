<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
import BackgroundComponent from '@/components/BackgroundComponent.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email('O e-mail deve ser um e-mail válido')
      .required('Email é um campo obrigatório'),
    password: yup.string().required('Senha é um campo obrigatório'),
  }),
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: false })

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <BackgroundComponent />
  <div class="container">
    <div class="container-login">
      <h1>Login</h1>
      <div class="container-email">
        <InputComponent
          v-model="email"
          v-bind="emailAttrs"
          label="Email"
          type="email"
          variant="auth"
          placeholder="Seu melhor email"
          id="email-login"
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
          id="password-login"
        />
        <span class="error password">{{ errors.password }}</span>
      </div>

      <ButtonSimpleComponent
        @click="onSubmit"
        class="btn-login"
        variant="button-auth"
        content="Entrar"
      />
      <p>Não possui uma conta? <router-link to="/register">registre-se.</router-link></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  @include flex-center;
  &-login {
    @include style-login-and-register;

    h1 {
      @include text-center-white;
      font-size: $font-size-5xl;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .error {
      font-size: $font-size-base;
      color: $gm-c-red;
      display: inline-block;
      margin-left: 8px;
    }

    .btn-login {
      margin-bottom: 1rem;
    }

    p {
      @include link-login-and-register;
    }
  }

  &-email {
    margin-bottom: 0.375rem;
  }

  &-password {
    margin-bottom: 1.875rem;
  }

  @include media('tablet') {
    &-login {
      h1 {
        font-size: $font-size-4xl;
        margin-bottom: 1.25rem;
      }
      .error {
        font-size: $font-size-sm;
      }
    }
    &-email {
      margin-bottom: 0;
    }
    &-password {
      margin-bottom: 1.25rem;
    }
  }
  @include media('mobile') {
    &-login {
      h1 {
        font-size: $font-size-3xl;
        margin-bottom: 1rem;
      }
      .error {
        font-size: $font-size-xs;
      }
    }
  }
}
</style>
