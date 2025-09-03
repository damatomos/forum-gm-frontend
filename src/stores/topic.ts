import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/api'
import type { User } from './user'

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

export const useTopicStore = defineStore('topic', () => {
  const topics = ref<Topic[]>([])

  const countTopics = computed(() => topics.value.length)

  async function fetchTopics() {
    const res = await api.get('/topic')

    if (res.status === 200) {
      topics.value = res.data
    }

    return topics.value || []
  }

  async function fetchRelevantsTopics() {
    const res = await api.get(`/topic?relevant=true`)

    if (res.status === 200) {
      topics.value = res.data
    }

    return topics.value || []
  }

  return { countTopics, fetchTopics, topics, fetchRelevantsTopics }
})
