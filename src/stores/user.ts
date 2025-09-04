import { defineStore } from 'pinia'
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
  async function fetchUser(): Promise<User | null> {
    const res = await api.get('/user')

    if (res.status === 200) {
      return res.data
    }
    return null
  }

  return { fetchUser }
})
