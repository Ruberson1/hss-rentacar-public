<script setup lang="ts">
import {onMounted, ref} from "vue";
// @ts-ignore
import {useAuthStore} from "../../store/auth/auth";

const admin = import.meta.env.VITE_APP_ADMIN_PERMISSION;
const common = import.meta.env.VITE_APP_COMMON_PERMISSION;
const customer = import.meta.env.VITE_APP_CUSTOMER_PERMISSION;
const perm = ref();
const authStore = useAuthStore();

onMounted(async () => {
  const token = sessionStorage.getItem('token');
  if(token != null) {
    await authStore.getPermission();
    // @ts-ignore
    perm.value = authStore.permission.id;
  }

})
</script>

<template>
  <div class=" opacity-90 fixed z-50 w-4/5 h-16 max-w-lg -translate-x-1/2 bg-gray-100 border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
      <a href="/history" class=" inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg class="w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
        </svg>
      </a>
      <a v-if="perm == admin" href="/cars" data-tooltip-target="tooltip-wallet" type="button" class=" inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg class="flex-shrink-0 w-5 h-5  transition duration-75 dark:text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-200 text-rose-400"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8
              6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857
              8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0
              11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10
               0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857
                1.857 0 0 0 16.143 10Z"/>
        </svg>
      </a>
      <a v-if="perm != admin" href="#" data-tooltip-target="tooltip-wallet" type="button" class="cursor-not-allowed  text-rose-400 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        |
      </a>
      <div v-if="perm != customer" class="flex inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <a href="/reservations" data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-rose-400 dark:bg-rose-400 rounded-full hover:bg-rose-700 group focus:ring-4 focus:ring-rose-300 focus:outline-none dark:focus:ring-rose-800">
          <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
        </a>
      </div>
      <div v-if="perm == customer" class="flex inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <a href="/categories" data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-rose-400 dark:bg-rose-400 rounded-full hover:bg-rose-700 group focus:ring-4 focus:ring-rose-300 focus:outline-none dark:focus:ring-rose-800">
          <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
        </a>
      </div>
      <a v-if="perm != admin" href="#" data-tooltip-target="tooltip-wallet" type="button" class="cursor-not-allowed text-rose-400 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        |
      </a>
      <a v-if="perm == admin" href="/users" data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg  class="flex-shrink-0 w-5 h-5 text-rose-400 transition duration-75 dark:text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
        </svg>
      </a>
      <a href="/login" data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg class="flex-shrink-0 w-5 h-5 text-rose-400 transition duration-75  group-hover:text-rose-500 dark:group-hover:text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>