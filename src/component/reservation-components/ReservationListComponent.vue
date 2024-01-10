<script setup lang="ts">
import {onMounted, ref} from "vue";
// @ts-ignore
import { useReservationStore } from "../../store/reservation/reservation";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Image from 'primevue/image';

const reservationStore = useReservationStore();
const reservations = ref();
onMounted(async () => {
  await reservationStore.handleFechtReservations()
  reservations.value = reservationStore.getReservations;
});


</script>


<template>
  <div v-if="reservations" class="card">
    <Accordion v-for="reservation in reservations" :key="reservation.id" >
      <AccordionTab >
        <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <span class="font-bold white-space-nowrap dark:text-white">{{ reservation.user.name }}</span>
                    </span>
        </template>
        <div class="flex px-8 flex-col lg:flex-row">
          <div class="lg:w-1/3 mx-auto py-8 ">
            <span class="dark:text-white md:text-md font-bold">Data de retirada:</span>
            <h2 class="pl-6 mt-2 mb-4 text-rose-800 w-32 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300">
               {{ reservation.start_reservation_date }}
            </h2>
            <span class="dark:text-white text-md font-bold">Data de devolução:</span>
            <h2 class="pl-6 mt-2 text-rose-800 w-32 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300">
              {{ reservation.end_reservation_date }}
            </h2>
          </div>
          <div class="lg:w-2/3 mt-4 lg:mt-0 lg:ml-4">
            <div class="card flex justify-content-center">
              <Image :src="`${reservation.category.img}`" alt="Image" width="500" preview />
            </div>
          </div>
        </div>
        <router-link :to="`/reservation/${reservation.id}`" class="flex items-center justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
              hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
              shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm
              py-2.5 mr-2 mb-2">
  <span class="flex items-center">
    Analisar
    <svg class="ml-2 w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
    </svg>
  </span>
        </router-link>

      </AccordionTab>
    </Accordion>
  </div>
</template>

<style>

</style>

