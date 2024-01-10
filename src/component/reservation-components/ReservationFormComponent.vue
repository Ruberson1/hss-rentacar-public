<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { onMounted, ref} from "vue";
import {useRoute} from "vue-router";
// @ts-ignore
import { useCarStore} from "../../store/car/car";
// @ts-ignore
import { useReservationStore } from "../../store/reservation/reservation";
import Dropdown from 'primevue/dropdown';
// @ts-ignore
import {useAuthStore} from "../../store/auth/auth";

const reservation = ref();
const route = useRoute();
const availableCars = ref();
const reservationId = route.params.reservationId;
const form = ref({
  startDate: '',
  endDate: '',
  reservationId: reservationId,
  userId: '',
  car: ''
});
const authStore = useAuthStore();
const perm = ref();
const minDate = new Date();
const carStore = useCarStore();
const reservationStore = useReservationStore();
const admin = import.meta.env.VITE_APP_ADMIN_PERMISSION;

onMounted(async () => {
  await authStore.getPermission();
  await reservationStore.handleGetReservationById(reservationId);
  reservation.value = reservationStore.reservation ;
  if(reservation.value) {
    // @ts-ignore
    form.value.startDate =  reservation.value[0].start_reservation_date;
    // @ts-ignore
    form.value.endDate = reservation.value[0].end_reservation_date;
    // @ts-ignore
    form.value.userId = reservation.value[0].user_id;
    // @ts-ignore
    form.value.categoryId = reservation.value[0].category_id;
  }
  await carStore.handleAvailableCars(form.value);
  availableCars.value = carStore.availableCars;
  // @ts-ignore
  perm.value = authStore.permission?.id;

})

</script>

<template>
  <div class="mx-auto sm:block md:w-1/2">
    <form @submit.prevent="reservationStore.handleUpdateReservation(form)">
      <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label for="cars" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecionar veículo:</label>
          <div v-if="carStore.availableCars" class="card flex justify-content-center">
            <Dropdown v-model="form.car" :options="carStore.availableCars" optionLabel="model" placeholder="Selecione o veículo" class="w-full md:w-14rem" />
          </div>
          <div v-if="reservationStore.errors.car" class="d-flex">
            <span><small class="text-red-700">Selecione um veículo</small></span>
          </div>
        </div>
        <div>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de retirada</label>
          <div class="card flex justify-content-center">
            <Calendar :disabled="perm != admin" class="w-full bg-gray-500 rounded-xl dark:text-white" :minDate="minDate" showTime hourFormat="24" placeholder="seleciona a data de retirada" v-model="form.startDate" />
          </div>
          <div v-if="reservationStore.errors.start_reservation_date" class="d-flex">
            <span><small class="text-red-700"> {{ reservationStore.errors.start_reservation_date }} </small></span>
          </div>
        </div>
        <div>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de devolução</label>
          <div class="card flex justify-content-center">
            <Calendar  :disabled="perm != admin" class="w-full dark:text-white" :minDate="new Date(form.startDate)" showTime hourFormat="24" placeholder="selecione a data de devolução" v-model="form.endDate" />
          </div>
          <div v-if="reservationStore.errors.end_reservation_date" class="d-flex">
            <span><small class="text-red-700">{{ reservationStore.errors.end_reservation_date[0] }}</small></span>
          </div>
        </div>
      </div>

      <div class="mb-16">
        <button type="submit" class=" w-full text-white flex items-center justify-center bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg
          shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
          mr-2 mb-2">
          Confirmar locação
          <svg class="w-4 h-4 ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m14.707 4.793-4-4a1 1 0 0 0-1.416 0l-4 4a1 1 0 1 0 1.416 1.414L9 3.914V12.5a1 1 0 0 0 2 0V3.914l2.293 2.293a1 1 0 0 0 1.414-1.414Z"/>
            <path d="M18 12h-5v.5a3 3 0 0 1-6 0V12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>