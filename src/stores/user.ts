import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/auth/token'
import api from '@/utils/api'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const user = ref(null)
  const isLogged = computed(() => !!token.value)

  async function login(username: string, password: string) {
    const res = await api.post('/auth/login', { username, password })
    token.value = res.data.access_token
    user.value = res.data.user
  }

  async function fetchUser() {
    if (!token.value) return
    const res = await api.get('/user')
    user.value = res.data
  }

  function logout() {
    token.value = null
    user.value = null
    removeToken()
  }

  return { token, user, isLogged, logout, login, fetchUser }
})
