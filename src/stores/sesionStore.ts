// stores/sesionStore.ts
import { defineStore } from 'pinia'
import type { SesionState } from '@/models/SesionState'

export const useSesionStore = defineStore('sesion', {
  state: (): SesionState => ({
    loading: false,
    data: JSON.parse(localStorage.getItem('sesionKey') || 'null')
  }),
  actions: {
    update(payload: string) {
      this.loading = true

      const updatedPayload = payload.split('.')[1]

      const createdAt = new Date() //Tiempo actual
      const expiresAt = new Date(Date.now() + 180 * 1000) //Mismo tiempo de expiración que en el fakeBackend
      const refreshedAt = new Date(Date.now() + 180 * 1000 - 120 * 1000) //Actualiza el token un minuto antes

      setTimeout(() => {
        this.data = {
          payload: updatedPayload,
          createdAt,
          refreshedAt,
          expiresAt
        }
        this.loading = false
      }, 500)
    },
    remove() {
      this.data = null
      localStorage.removeItem('sesionKey')
    }
  }
})
