import { defineStore } from 'pinia'
import type { UserData } from '@/models/userStore';

export const StorageUser = defineStore('user', {
  state: () => ({
    user: null as UserData | null //se define el estado
  }),
  actions: {
    //establezco el tipo de userData como UserData
    setUser(userData: UserData) {
      this.user = userData;
    }
  }
});
