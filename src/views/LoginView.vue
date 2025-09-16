<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
import BackgroundComponent from '@/components/BackgroundComponent.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
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

      <InputComponent
        v-model="password"
        v-bind="passwordAttrs"
        label="Password"
        type="password"
        variant="auth"
        id="password-login"
      />
      <span class="error password">{{ errors.password }}</span>

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
  .container-login {
    @include style-login-and-register;

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
      &.email {
        top: 455px;
      }
      &.password {
        top: 553px;
      }
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
}
</style>
