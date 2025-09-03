import MockAdapter from 'axios-mock-adapter'
import topics from './data/topics.json'
import api from '@/utils/api'
import type { Topic } from '@/stores/topic'

const mock = new MockAdapter(api, { delayResponse: 500 })

const topicList = topics as unknown as Topic[]

mock.onGet('/topic').reply(
  200,
  (topicList as Topic[])
    .filter((topic) => topic.enabled)
    .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()),
)

mock.onGet('/topic?relevant=true').reply(
  200,
  (topicList as Topic[]).filter((topic) => topic.enabled && topic.count_heart > 30),
)
