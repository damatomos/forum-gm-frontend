<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import BackButtonIcon from '@/components/icons/BackButtonIcon.vue'
import { RouterLink } from 'vue-router'

import MarkdownEditor from '@/components/editor/MarkdownEditor.vue'
import ButtonSimpleComponent from '@/components/ButtonSimpleComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    title: yup
      .string()
      // .min(10, 'O título deve conter pelo menos 10 caracteres')
      .required('O título é obrigatório'),
    markdown: yup
      .string()
      // .min(200, 'O tópico deve conter pelo menos 200 caracteres')
      // .required('O campo não pode ser vazio'),
  }),
})

const [title, titleAttrs] = defineField('title', { validateOnModelUpdate: false })
const [markdown, markdownAttrs] = defineField('markdown', { validateOnModelUpdate: false, })

const onSubmit = handleSubmit((value) => {
  console.log(value)
})


</script>

<template>
  <HeaderComponent />
  <main>
    <div class="background"></div>
    <div class="container">
      <header class="top-header">
        <RouterLink to="/">
          <BackButtonIcon />
        </RouterLink>
        <ButtonSimpleComponent class="btn-publish" content="Publicar" variant="rose" @click="onSubmit" />
      </header>

      <div class="editor">
        <InputComponent placeholder="Título" variant="topic-title" v-model="title" v-bind="titleAttrs" />
        <span class="title-error" v-if="errors.title">{{ errors.title }}</span>
        <MarkdownEditor v-model="markdown" v-bind="markdownAttrs" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100dvh - 50px);

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    clip-path: polygon(0% 0%, 20% 0%, 55% 100%, 0% 100%);

    background-color: $color-pink;
  }

  .container {
    margin: 0 auto;
    background-color: transparent;
    width: 100%;
    max-width: 1280px;
    min-height: calc(100dvh - 50px);
    padding: 100px 32px 60px 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    .top-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn-publish {
        max-width: fit-content;
        width: auto;
        padding: 0.625rem 1.5rem;

        &:hover {
          scale: 1.05;
        }
      }
    }

    .editor {
      font-family: $gm-c-secondary-font;
      width: 100%;
      background: white;
      padding: 1rem 2rem;

      & .title-error {
        font-size: $font-size-xl;
        color: $color-error;
      }
    }
  }
}
</style>
