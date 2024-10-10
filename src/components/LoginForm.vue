<script setup lang="ts">
//import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { StorageUser } from '@/stores/userStore'
import type { UserData } from '@/models/UserModel'

// importaciones de librerias
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
/*const user: UserData = reactive<User>({
  username: '',
  password: '',
  remember: '',
  })*/

const router = useRouter()

const schema = Yup.object().shape({
  username: Yup.string().required('Usuario Requerido'),
  password: Yup.string().required('Password Requerido')
})
function handleSubmit() {
  //cuando el usuario le de en ingresar se tomarán los datos por consola
  /*const userData = {
    user: user.value,
    password: password.value,
    remember: remember.value,
  };*/

  /*userConsole.setUser(userData);*/
  router.push('/home') //estoy redireccionando al Homw
}
</script>

<template>
  <div class="wrapper">
    <Form
      id="loginForm"
      @submit.prevent="handleSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <h1>Login</h1>
      <div class="input-bx">
        <Field
          name="username"
          type="text"
          :class="{ 'is-invalid': errors.username || errors.apiError }"
          placeholder="Usuario"
          required
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="input-bx">
        <Field name="password" pe="password" placeholder="Contraseña" required />
      </div>
      <div class="remember-forgot">
        <label> <Field name="remember" type="checkbox" /> Recordarme </label>
        <a href="#">Olvidaste tu contraseña</a>
      </div>
      <button type="submit" class="btn" @click.prevent="handleSubmit">Ingresar</button>
    </Form>
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

.wrapper .input-bx {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.wrapper .input-bx input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  padding: 20px 45px 20px 20px;
}

.wrapper .input-bx input::placeholder {
  color: #fff;
}

.wrapper .input-bx .icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
}

.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
  accent-color: #fff;
  margin-right: 3px;
}

.wrapper .remember-forgot a {
  color: #fff;
  text-decoration: none;
}

.wrapper .remember-forgot a:hover {
  text-decoration: underline;
}

.wrapper button {
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}
</style>
