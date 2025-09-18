<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import BackButtonIcon from '@/components/icons/BackButtonIcon.vue'
import { RouterLink } from 'vue-router'

import MarkdownEditor from '@/components/editor/MarkdownEditor.vue'
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
        <button>Publicar</button>
      </header>

      <div class="editor">
        <MarkdownEditor />
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
    }

    .editor {
      font-family: $gm-c-secondary-font;
      width: 100%;
      background: white;
      padding: 1rem 2rem;
    }
  }
}
</style>
