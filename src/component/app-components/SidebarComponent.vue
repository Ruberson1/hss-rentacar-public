<script setup lang="ts">
// @ts-ignore
import { useAuthStore} from "../../store/auth/auth";
import { onMounted, ref } from "vue";
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import {useReservationStore} from "../../store/reservation/reservation";


const admin = import.meta.env.VITE_APP_ADMIN_PERMISSION;
const common = import.meta.env.VITE_APP_COMMON_PERMISSION;
const customer = import.meta.env.VITE_APP_CUSTOMER_PERMISSION;
const perm = ref();
const authStore = useAuthStore();
const reservationStore = useReservationStore();
const reservations = ref();
const reservationsLenght = ref();
onMounted(async () => {
  const token = sessionStorage.getItem('token');
  if(token != null) {
    await authStore.getPermission();
    // @ts-ignore
    perm.value = authStore.permission.id;

    await reservationStore.handleFechtReservations()
    reservations.value = reservationStore.getReservations;
    reservationsLenght.value = reservations.value.length;
  }

});
</script>

<template>
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 -translate-x-full transition-transform sm:translate-x-0 bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-if="perm == admin || perm == common" class="hidden">
          <router-link to="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            <span class="ml-3 font-light text-gray-400">Dashboard</span>
          </router-link>
        </li>
        <li v-if="perm == admin || perm == common">
          <router-link to="/reservations" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200"
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8
              6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857
              8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0
              11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10
               0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857
                1.857 0 0 0 16.143 10Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">
              Solicitações
            </span>
            <Badge v-if="reservationsLenght && reservationsLenght > 0" class="px-2 bg-green-500 text-sm"  :value="`${reservationsLenght}`"></Badge>
          </router-link>
        </li>
        <li v-if="perm == admin">
          <router-link to="/users" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Usuários</span>
          </router-link>
        </li>
        <li v-if="perm == customer">
          <router-link to="/categories" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 10h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H17M1 10v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M1 10l2-9h12l2 9"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Alugar</span>
          </router-link>
        </li>
        <li v-if="perm == customer">
          <router-link to="/history" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Histórico</span>
          </router-link>
        </li>
        <li v-if="perm == admin || perm == common">
          <router-link to="/history" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Histórico Geral</span>
          </router-link>
        </li>
        <li v-if="perm == admin">
          <router-link to="/cars" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Veículos</span>
          </router-link>
        </li>
        <li>
          <router-link @click="authStore.handleLogout()" to="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap font-light text-gray-400">Sair</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>

</style>