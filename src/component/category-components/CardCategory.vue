<script setup lang="ts">
// @ts-ignore
import { useCategoryStore } from "../../store/category/category";
import {onMounted, ref} from "vue";

const authCategory = useCategoryStore();
const categories = ref();

onMounted(async () => {
  await authCategory.handleFechtCategories()

  categories.value = authCategory.categories;

})
</script>

<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="category in categories" :key="category.id">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" :src="`${category.img}`" alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ category.name }}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {{ category.description }}</p>
          <router-link :to="`reservation/customer/${category.id}`"
                       class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4
                       focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm
                       px-5 py-2.5 text-center me-2 mb-2">
            Selecionar

          </router-link>
        </div>
      </div>
    </div>
  </div>



</template>

<style scoped>

</style>