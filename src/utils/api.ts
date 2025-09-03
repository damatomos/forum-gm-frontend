import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth/token'
import { useUserStore } from '@/stores/user'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 500) {
      removeToken()
      useUserStore().logout()
    }
    return Promise.reject(err)
  },
)

export default api
