import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/auth/token'
import api from '@/utils/api'
import type { User } from './user'

export interface AuthUser {
  access_token: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string): Promise<boolean> {
    const res = await api.post<AuthUser>('/auth/login', { username, password })

    if (res.status === 200) {
      token.value = res.data.access_token
      user.value = res.data.user
      return true
    }
    return false
  }

  async function register(name: string, username: string, password: string): Promise<boolean> {
    const res = await api.post<string>('/auth/register', { name, username, password })

    if (res.status === 201) {
      return true
    }

    return false
  }

  function logout() {
    token.value = null
    user.value = null
    removeToken()
  }

  return { token, user, isAuthenticated, logout, login, register }
})
