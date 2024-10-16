<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useSesionStore } from '@/stores/sesionStore'
import { useUserStore } from '@/stores/userStore'
import { useTime } from '@/helpers/formatDate'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { UserData } from '@/models/UserModel'

//aca voy a crear las constantes de los stores
const authStore = useAuthStore()
const sesionStore = useSesionStore()
const userStore = useUserStore()
const router = useRouter()
const user = authStore.auth.data as UserData

//fakea la carga de usuarios con un mini delay
let isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

function logout() {
  authStore.logout()
  sesionStore.remove()
}

//boton de logout
const handleLogout = () => {
  authStore.logout()
  sesionStore.remove()
  router.push({ name: 'LoginPage' })
}
</script>

<template>
  <div class="wrapper">
    <h1>Hola, {{ user.firstname }}</h1>
    <div>
      <h2>Informacion de tu usuario:</h2>
      <p>Nombre: {{ `${user.firstname} ${user.lastname}` }}</p>
      <p>Rol: {{ user.isAdmin ? 'Admin' : 'Usuario' }}</p>
    </div>
    <div>
      <div class="title">
        <h2>Informacion de sesion:</h2>
        <p v-show="sesionStore.loading" class="loader"></p>
      </div>
      <p>
        JWT Payload: <span>{{ sesionStore.data?.payload }}</span>
      </p>
      <p>
        JWT Creado a las: <span>{{ useTime(sesionStore.data?.createdAt!) }}</span>
      </p>
      <p>
        JWT Expira a las: <span>{{ useTime(sesionStore.data?.expiresAt!) }}</span>
      </p>
      <p>
        JWT se refresca a las: <span>{{ useTime(sesionStore.data?.refreshedAt!) }}</span>
      </p>
    </div>

    <div>
      <div class="title">
        <h2>Lista de usuarios:</h2>
        <p v-show="isLoading" class="loader"></p>
      </div>
      <div v-for="user in userStore.users" v-bind:key="user.id" v-show="!isLoading">
        <p>{{ `${user.firstname} ${user.lastname} [${user.isAdmin ? 'Admin' : 'Usuario'}]` }}</p>
      </div>
      <button v-show="user.isAdmin" class="add">+ Agregar usuario</button>
    </div>

    <div class="limit"></div>

    <button @click="handleLogout" class="logout">Salir</button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

.wrapper h1 {
  font-size: 3em;
  text-align: center;
}

.home-view {
  padding: 20px;
}
</style>
