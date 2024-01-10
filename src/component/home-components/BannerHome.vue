<script setup lang="ts">
// @ts-ignore
import { useAuthStore} from "../../store/auth/auth";
import {onMounted, ref} from "vue";

const perm = ref();
const authStore = useAuthStore();

const customer = import.meta.env.VITE_APP_CUSTOMER_PERMISSION;
onMounted(async () => {
  await authStore.getPermission();
  // @ts-ignore
  perm.value = authStore.permission.id

});
</script>

<template>
  <div class="bg-cover bg-no-repeat bg-center py-5 rounded-3xl" style="background-image: url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3x50FIvosfzELIcaMQAkQkNweK4JqNmPwk46OAIpnSc11B_aa-e2AmdYnTMz7O57vQtTtHf5EB6IVdsAH6S3mx8GAN8Rvl7P85mbVWy0cPnH7_3ytclCB6nK_6pv55n1SdAziZKYFMf46sb2MJqZ8bZ_n8wEwCgLmGCfyKBkpvm0O9rMFGlrXuO4NUw/w996-h660/banner.png');">
    <div class="container p-20">
      <img src="../../../public/images/logo.png" alt="Delivery" class="w-52 h-52 object-contain">
      <h1 class="text-6xl text-red-800 font-medium mb-4">
        Liberte-se da Rotina <br>  Explore com Estilo
      </h1>
      <p class="text-gray-200 font-bold"> "O Aluguel de Carros Transforma Cada Viagem em Uma Jornada Inesquecível."</p>
      <div class="mt-12" v-if="perm == customer">
        <router-link to="/categories" class="bg-primary border border-primary text-white px-8 py-3 font-medium
                    rounded-md hover:bg-transparent hover:text-primary">Alugar Agora</router-link>
      </div>
      <div class="mt-12" v-else>
        <router-link to="/reservations" class="bg-primary border border-primary text-white px-8 py-3 font-medium
                    rounded-md hover:bg-transparent hover:text-primary">Solicitações</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>