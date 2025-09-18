<script setup lang="ts">
import CardTopicComponent from '@/components/CardTopicComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SkeletonComponent from '@/components/SkeletonComponent.vue'
import TabComponent from '@/components/TabComponent.vue'
import { type Topic, useTopicStore, type TopicPage } from '@/stores/topic'
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

const topicStore = useTopicStore()

const loading = ref<boolean>(false)
const contentTopics = ref<Topic[]>([])
const currentPage = ref<TopicPage | null>(null)
const page = ref<number>(0)
const componentScroller = ref<HTMLDivElement | null>(null)

const selectedTab = ref<number>(0)

async function loadRelevantsTopics(): Promise<Topic[]> {
  const relevants = await topicStore.fetchRelevantsTopics({ page: page.value })
  currentPage.value = relevants

  if (!relevants || relevants.empty) {
    return []
  }

  return relevants.content
}

async function loadRecentsTopics(): Promise<Topic[]> {
  const recents = await topicStore.fetchTopics({ page: page.value })
  currentPage.value = recents

  console.log('lastValue: ', contentTopics.value)

  if (!recents || recents.empty) {
    console.log('Is empty')
    return []
  }

  return recents.content
}

async function loadTopics() {
  loading.value = true
  let topics: Topic[] = []
  if (selectedTab.value === 0) {
    topics = await loadRelevantsTopics()
  } else {
    topics = await loadRecentsTopics()
  }

  gsap.fromTo(
    '.feed-content',
    {
      opacity: 0.5,
    },
    {
      duration: 0.5,
      ease: 'power1.out',
      opacity: 1,
    },
  )

  contentTopics.value = contentTopics.value.concat(topics)
  loading.value = false
}

function handleScroll(_e: unknown) {
  const element = componentScroller.value
  if (element && element.getBoundingClientRect().bottom < window.innerHeight - 30) {
    if (!currentPage.value?.last) {
      page.value++
      loadTopics()
    }
  }
}

onMounted(async () => {
  await loadTopics()

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

async function selectTab(index: number) {
  if (selectedTab.value === index) return
  contentTopics.value = []
  page.value = 0
  currentPage.value = null
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
        <RouterLink to="topic/create">
          <button>Criar tópico</button>
        </RouterLink>
        <RouterLink to="topic/create">
          <button class="add">+</button>
        </RouterLink>
      </div>
    </header>
    <section class="feed-content" ref="componentScroller">
      <template v-if="contentTopics">
        <CardTopicComponent v-for="topic in contentTopics" :key="topic.id" :topic="topic" />
      </template>
      <template v-if="loading">
        <SkeletonComponent v-for="topic in [1, 2, 3, 4, 5]" :key="topic" />
      </template>
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
