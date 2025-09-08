import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/api'
import type { User } from './user'
import type { Page } from '@/interfaces/pageable'

export interface Tag {
  id?: string
  content: string
  slug?: string
}

export interface Topic {
  id?: string
  title: string
  slug?: string
  article: string
  timer: number
  tags?: Tag[]
  user: User
  answers?: []
  count_heart: number
  count_raiden: number
  enabled: boolean
  count_answer: number
  count_comment: number
  created_at?: Date
  updated_at?: Date
}

export interface TopicPage extends Page<Topic> {
  relevant: boolean
  only_enabled: boolean
}

export const useTopicStore = defineStore('topic', () => {
  const topicPage = ref<TopicPage>()

  const countTopics = computed(() => topicPage.value?.size)

  async function fetchTopics(params?: { page?: number; size?: number }): Promise<TopicPage | null> {
    const page = params?.page ?? 0
    const size = params?.size ?? 5
    const res = await api.get(`/topic?page=${page}&size=${size}`)

    if (res.status === 200) {
      topicPage.value = res.data
    }

    return topicPage.value || null
  }

  async function fetchRelevantsTopics(params?: {
    page: number
    size: number
  }): Promise<TopicPage | null> {
    const { page, size } = params ?? { page: 0, size: 5 }

    const res = await api.get(`/topic?relevant=true&page=${page}&size=${size}`)

    if (res.status === 200) {
      topicPage.value = res.data
    }

    return topicPage.value || null
  }

  return { countTopics, fetchTopics, topicPage, fetchRelevantsTopics }
})
