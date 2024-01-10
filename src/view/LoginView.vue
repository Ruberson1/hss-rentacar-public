<script setup lang="ts">
import LoginBackground from "../component/login-components/LoginBackground.vue";
import SocialLoginButtons from "../component/login-components/SocialLoginButtons.vue";
import LoginFormComponent from "../component/login-components/LoginFormComponent.vue";
import {onMounted} from "vue";
// @ts-ignore
import {useSidebarStore} from "../store/sidebar/sidebar";

onMounted(() => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  const visible = useSidebarStore();
  visible.isVisible = false
})
</script>

<template>
  <div class="4-xl:container h-screen m-auto bg-white dark:bg-gray-800">
    <LoginBackground />
    <div hidden role="hidden" class="fixed inset-0 w-6/12 ml-auto bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-xl lg:block"></div>
    <div class="relative h-screen ml-auto lg:w-6/12 dark:bg-gray-800">
      <div class="dark:bg-gray-800">
        <div class="space-y-4">
          <a href="">
            <img src="../../public/images/logo.png" class="w-44" alt="logo">
          </a>
          <p class="font-medium text-lg dark:text-gray-100 text-gray-600">HSS Rental - Bem vindo(a)!</p>
        </div>

        <SocialLoginButtons />

        <div role="hidden" class="mt-12 border-t">
          <span class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white dark:bg-gray-800">Ou</span>
        </div>
        <LoginFormComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>