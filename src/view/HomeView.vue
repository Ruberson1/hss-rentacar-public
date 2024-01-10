
<script setup lang="ts">
// @ts-ignore
import {useSidebarStore} from "../store/sidebar/sidebar";
import {onMounted} from "vue";
import BannerHome from "../component/home-components/BannerHome.vue";
import CardsHome from "../component/home-components/CardsHome.vue";
// @ts-ignore
import {firebaseCloudMessaging} from "../../firebase";

onMounted(async () => {
  await firebaseCloudMessaging.init();
  const visible = useSidebarStore();
  visible.isVisible = true
})
</script>

<template>
  <!-- banner -->
  <BannerHome />
  <!-- ./banner -->

  <!-- features -->
  <CardsHome />
  <!-- ./features -->

</template>

<style scoped>

</style>