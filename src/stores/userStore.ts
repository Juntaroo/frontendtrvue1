import { defineStore } from 'pinia'
import type { UserData } from '@/models/UserModel'

export const StorageUser = defineStore('user', {
  state: () => ({
    user: null as UserData | null //se define el estado
  }),
  actions: {
    /*setUserData(userData: UserData) {
      console.log(`user: ${userData.user}`);
      console.log(`password: ${userData.password}`);
      console.log(`remind me: ${userData.remember}`);
  },*/
    // Función para actualizar el estado del usuario
    setUser(userData: UserData) {
      //establezco el tipo de userData como UserData
      this.user = userData
      // Llama a la función setUserData para mostrar la información en la consola
      /*this.setUserData(userData);*/
    }
  }
})
