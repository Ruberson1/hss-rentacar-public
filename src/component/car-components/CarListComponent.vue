<script setup lang="ts">
import Card from 'primevue/card';
import {useCarStore} from "../../store/car/car";
import {onMounted, ref} from "vue";

const carStore = useCarStore();
const cars = ref();

onMounted(async () => {
  await carStore.handleGetCars();
  cars.value = carStore.cars;
})
</script>

<template>
  <div class="">
    <div class="flex flex-wrap gap-4">
      <div v-for="car in cars" :key="car.id" class="col-md-4 col-sm-6 mb-4 ">
        <Card style="width: 100%">
          <template #header>
            <img alt="user header" :src="`${car.category.img}`" />
          </template>
          <template #title> {{ car.model }} </template>
          <template #subtitle> {{ car.brand }} </template>
        </Card>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>

