import MockAdapter from 'axios-mock-adapter'
import topics from './data/topics.json'
import api from '@/utils/api'
import type { Topic, TopicPage } from '@/stores/topic'
import type { AxiosRequestConfig } from 'axios'

const mock = new MockAdapter(api, { delayResponse: 500 })

const topicList = topics as unknown as Topic[]

mock.onGet(/\/topic.*/).reply((config: AxiosRequestConfig) => {
  const url = new URL(config.url!, 'http://localhost')
  const params = new URLSearchParams(url.search)

  const relevant = params.get('relevant') === 'true'
  const page = Number(params.get('page') ?? 0)
  const size = Number(params.get('size') ?? 5)
  // const sort = params.sort ?? null
  const only_enabled = params.get('only_enabled') === 'true'

  return [200, getTopicPages({ page, size, relevant, only_enabled, sort: '' })]
})

function updateTopicDateForToday(): Topic[] {
  return topicList.map((t) => {
    t.updated_at = updateDate(new Date(), new Date(t.updated_at!))
    t.created_at = updateDate(new Date(), new Date(t.updated_at!))
    return t
  })
}

function updateDate(curr_date: Date, last_date: Date) {
  curr_date.setHours(last_date.getHours())
  curr_date.setMinutes(last_date.getMinutes())
  curr_date.setSeconds(last_date.getSeconds())
  return curr_date
}

function getTopicPages(params: {
  page: number
  size: number
  sort: string
  relevant: boolean
  only_enabled: boolean
}): TopicPage {
  updateTopicDateForToday()

  const { page, size, sort, relevant, only_enabled } = params

  let content = topicList ?? []

  if (relevant) {
    content = content.filter((topic) => topic.enabled && topic.count_heart > 30)
  }

  if (only_enabled) {
    content = content.filter((topic) => topic.enabled)
  }

  // order by timer
  content = content.filter((t) => getCurrentTime(t) >= 0)

  content = content.slice(page * size, page * size + size)
  return {
    content,
    empty: false,
    first: page == 0,
    last: page == Math.ceil(topicList.length / size) - 1,
    number: page,
    sort: {
      empty: false,
      sorted: sort != null,
      unsorted: false,
    },
    number_of_elements: size,
    pageable: {
      offset: 0,
      page_number: page,
      page_size: size,
      paged: true,
      sort: {
        empty: false,
        sorted: sort != null,
        unsorted: false,
      },
      unpaged: false,
    },
    relevant: relevant,
    size,
    total_elements: topicList.length,
    total_pages: Math.ceil(topicList.length / size) - 1,
    only_enabled,
  }
}

const getCurrentTime = (topic: Topic) => {
  return new Date(topic.created_at!).getTime() + topic.timer - new Date().getTime()
}
