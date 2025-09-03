<script setup lang="ts">
import CardTopicComponent from '@/components/CardTopicComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import TabComponent from '@/components/TabComponent.vue'
import { useTopicStore, type Topic } from '@/stores/topic'
import { onMounted, ref } from 'vue'

const topicStore = useTopicStore()

const loading = ref<boolean>(false)
const topics = ref<Topic[]>([])

const selectedTab = ref<number>(0)

async function loadTopics() {
  loading.value = true
  if (selectedTab.value === 0) {
    topics.value = (await topicStore.fetchRelevantsTopics()).slice().reverse()
  } else {
    topics.value = await topicStore.fetchTopics()
  }
  loading.value = false
}

onMounted(async () => {
  await loadTopics()
})

async function selectTab(index: number) {
  selectedTab.value = index
  await loadTopics()
}
</script>

<template>
  <HeaderComponent />
  <main class="container">
    <header class="feed-header">
      <div class="feed-tabs">
        <TabComponent label="Relevantes" :is-active="selectedTab === 0" @click="selectTab(0)" />
        <TabComponent label="Recentes" :is-active="selectedTab === 1" @click="selectTab(1)" />
      </div>
      <div class="feed-actions">
        <button>Criar tópico</button>
        <button class="add">+</button>
      </div>
    </header>
    <section class="feed-content">
      <div v-if="loading">Carregando tópicos...</div>
      <CardTopicComponent v-else v-for="topic in topics" :key="topic.id" :topic="topic" />
    </section>
  </main>
</template>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  background-color: $gm-c-white;
  width: 100%;
  max-width: 1280px;
  min-height: calc(100dvh - 50px);
  padding: 100px;

  @include media('tablet') {
    padding: 100px 32px;
  }

  @include media('mobile') {
    padding: 100px 16px;
    .feed-actions {
      button {
        display: none;
      }

      button.add {
        display: flex !important;
        width: 32px;
        height: 32px;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      }
    }
  }

  .feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .feed-tabs {
      display: flex;
    }

    .feed-actions {
      button {
        background-color: $gm-c-purple;
        color: $gm-c-white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background-color: $gm-c-red-dark;
        }
      }

      .add {
        display: none;
      }
    }
  }

  .feed-content {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
