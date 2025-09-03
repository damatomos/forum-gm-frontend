import MockAdapter from 'axios-mock-adapter'
import topics from './data/topics.json'
import api from '@/utils/api'

const mock = new MockAdapter(api, { delayResponse: 500 })

mock.onGet('/topic').reply(200, topics)
