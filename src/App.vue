
<script setup lang="ts">
import SidebarComponent from "./component/app-components/SidebarComponent.vue";
import BottomNavigationComponent from "./component/app-components/BottomNavigationComponent.vue";
import NavbarComponent from "./component/app-components/NavbarComponent.vue";
// @ts-ignore
import {useSidebarStore} from "./store/sidebar/sidebar";


const visible = useSidebarStore();


</script>
<template>
  <NavbarComponent v-if="visible.isVisible" />
  <SidebarComponent v-if="visible.isVisible" />
  <BottomNavigationComponent v-if="visible.isVisible" class="block md:hidden"/>

  <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
