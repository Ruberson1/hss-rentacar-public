<script setup lang="ts">
import {ref} from "vue";
// @ts-ignore
import {useAuthStore} from '../../store/auth/auth';

const auth = useAuthStore();
const form = ref({
  name:'',
  email: '',
  cpf: '',
  password: '',
  password_confirmation: ''
})

</script>

<template>
  <form @submit.prevent="auth.handleLoginOrRegister(form)" class="space-y-6 py-6 dark:bg-gray-800">
    <div v-if="auth.showNameInput" >
      <input
          type="text"
          name="name"
          placeholder="Digite seu nome"
          id="name"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400"
          v-model="form.name"
      />
      <div v-if="auth.errors.name" class="d-flex">
        <span ><small class="text-red-700">{{ auth.errors.name[0] }}</small></span>
      </div>
    </div>
    <div v-if="auth.showNameInput">
      <input
          type="text"
          name="cpf"
          placeholder="Digite seu CPF (apenas números)"
          id="name"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400"
          v-model="form.cpf"
      />
      <div v-if="auth.errors.cpf" class="d-flex">
        <span><small class="text-red-700">{{ auth.errors.cpf[0] }}</small></span>
      </div>
    </div>
    <div>
      <input
          type="email"
          placeholder="ex: email@email.com"
          name="email"
          id="email"
          v-model="form.email"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
      <div v-if="auth.errors.email" class="d-flex">
        <span><small class="text-red-700">{{ auth.errors.email[0] }}</small></span>
      </div>
    </div>

    <div class="">
      <input
          v-model="form.password"
          type="password"
          placeholder="Sua senha"
          name="pass"
          id="pass"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
      <div v-if="auth.errors.password" class="d-flex">
        <span><small class="text-red-700">{{ auth.errors.password[0] }}</small></span>
      </div>
    </div>

    <div class="flex flex-col items-end" v-if="auth.showNameInput">
      <input
          v-model="form.password_confirmation"
          type="password"
          placeholder="Confirme a senha"
          name="pass"
          id="pass"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
    </div>

    <div>
      <button type="submit" class=" w-full px-6 py-3 rounded-xl bg-rose-400 transition hover:bg-rose-500 focus:bg-rose-600 active:bg-rose-200">
        <span class="font-semibold text-white text-lg" >{{ auth.buttonLabel }}</span>
      </button>
      <a href="#" type="reset" class="w-max p-3 -ml-3 text-gray-600 dark:text-gray-200">
        {{ auth.questionLabel }}
        <span class="text-sm font-semibold hover:text-rose-500 tracking-wide text-rose-400" @click="auth.toggleRegistration">{{ auth.buttonRegisterLabel }}</span>
      </a>
    </div>
  </form>
</template>

<style scoped>

</style>