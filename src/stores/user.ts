import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/auth/token'
import api from '@/utils/api'

export interface User {
  id?: string
  name: string
  username: string
  gmp: number
  photo_url?: string
}

export interface AuthUser {
  access_token: string
  user: User
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isLogged = computed(() => !!token.value)

  async function login(username: string, password: string): Promise<boolean> {
    const res = await api.post<AuthUser>('/auth/login', { username, password })

    if (res.status === 200) {
      token.value = res.data.access_token
      user.value = res.data.user
      return true
    }
    return false
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
