import { defineStore } from 'pinia'
import type { UserData } from '@/models/UserModel'

interface UserState {
  users: UserData[]
}

const baseUrl = `${import.meta.env.VITE_API_URL}/users`
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: JSON.parse(localStorage.getItem('vue-3-jwt-refresh-token-users') || '[]')
  }),
  actions: {
    setUsers(users: UserData[]): void {
      this.users = users
    }
  }
})
