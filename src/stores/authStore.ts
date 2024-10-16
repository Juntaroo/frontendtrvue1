import { fetchWrapper } from '@/helpers/fetchWrapper'
import type { UserData } from '@/models/UserModel'
import { defineStore } from 'pinia'
import router from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: {} as { loading: boolean; data?: UserData | null; refreshTokenTimeout: number | null }
  }),
  actions: {
    async login(username: string, password: string) {
      console.log('Intentando iniciar sesión con:', { username, password }) // Agrega esta línea
      try {
        this.auth.data = await fetchWrapper.post(
          `${baseUrl}/authenticate`,
          { username, password },
          { credentials: 'include' }
        )
        this.startRefreshTokenTimer()
      } catch (error) {
        console.error('Login error:', error)
        throw new Error('Error de autenticación, credenciales inválidas.')
      }
    },
    logout() {
      fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' })
      this.stopRefreshTokenTimer()
      this.auth.data = null
      router.push({ name: 'LoginPage' })
    },
    async refreshToken() {
      try {
        this.auth.data = await fetchWrapper.post(
          `${baseUrl}/refresh-token`,
          {},
          { credentials: 'include' }
        )
      } catch (error) {
        console.error('Error al refrescar el token:', error)
        this.logout()
      }
    },
    startRefreshTokenTimer() {
      if (!this.auth.data || !this.auth.data.jwtToken) return

      // parsear un objeto json de base64
      const jwtBase64 = this.auth.data.jwtToken.split('.')[1]
      const decodedJwtToken = JSON.parse(atob(jwtBase64))

      //creo un timeout para refrescar el token antes de que expire
      const expires = new Date(decodedJwtToken.exp * 1000)
      const timeout = expires.getTime() - Date.now() - 60 * 1000

      this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
    },
    stopRefreshTokenTimer() {
      if (this.auth.refreshTokenTimeout) {
        clearTimeout(this.auth.refreshTokenTimeout)
        this.auth.refreshTokenTimeout = null
      }
    }
  }
})
