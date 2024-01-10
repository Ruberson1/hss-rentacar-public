<script setup lang="ts">
import {onMounted, ref} from "vue";
// @ts-ignore
import {useReservationStore} from "../../store/reservation/reservation";
import ReservationStatusIndicator from "../reservation-components/ReservationStatusIndicator.vue";


const reservationStore = useReservationStore();
const histories = ref();
onMounted(async ()  => {
  await reservationStore.handleFechtHistories();
  histories.value = reservationStore.getHistories;
})
</script>

<template>
  <!-- component -->
  <div v-if="histories && histories.length > 0">
    <div class="hidden md:flex justify-center items-center bg-gray-200 dark:bg-gray-900 rounded-md">
      <div class="col-span-6">
        <div class="overflow-auto lg:overflow-visible ">
          <table class="table dark:text-gray-400 border-separate space-y-6 text-sm">
            <thead class="bg-white dark:bg-gray-800">
            <tr>
              <th class="p-4">Usuário</th>
              <th class="p-3 text-center">Categoria</th>
              <th class="p-3 text-center">Retirada</th>
              <th class="p-3 text-center">Devolução</th>
              <th class="p-3 text-center">Veículo</th>
              <th class="p-3 text-center">Placa</th>
              <th class="p-3 text-center">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white dark:bg-gray-800 shadow dark:shadow-cyan-500/50 " v-for="h in histories" :key="h.id" >
              <td class="p-3">
                <div class="flex align-items-center">
                  <img class="rounded-full h-12 w-12  object-cover" src="../../../public/images/user.png" alt="unsplash image">
                  <div class="ml-3">
                    <div class="">Helena</div>
                    <div class="text-gray-500">helena@gmail.com</div>
                  </div>
                </div>
              </td>
              <td class="p-1 text-center font-bold">
                HATCH
              </td>
              <td class="p-3" >
                {{ h.start_reservation_date }}
              </td>
              <td class="p-3">
                {{ h.end_reservation_date }}
              </td>
              <td class="p-1 text-center">
                HB20
              </td>
              <td class="p-2 text-center">
               HSS4554
              </td>
              <td class="p-2">
                <ReservationStatusIndicator :isConfirm="h.confirm_reservation" :isCanceled="h.canceled"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
<!--     HISTÓRICO CARDS  MOBILE VIEW-->

        <div  class="grid grid-cols-1 md:hidden sm:grid-cols-2 gap-4 " >
          <div v-for="h in histories" :key="h.id" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
            <div class="flex items-center space-x-8 text-sm">
              <div class="text-gray-500 dark:text-gray-400">Helena</div>
              <div>
                <ReservationStatusIndicator :isConfirm="h.confirm_reservation" :isCanceled="h.canceled"/>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-400">
              helena@gmail.com
            </div>
            <div class="text-sm font-medium dark:text-rose-300 text-black">
              HATCH
            </div>
            <div class="flex text-sm font-medium dark:text-gray-400  text-black">
              <span class="text-rose-500 mr-4">Retirada:</span>
              {{ h.start_reservation_date }}
            </div>
            <div class="flex text-sm font-medium dark:text-gray-400 text-black">
              <span class="text-rose-500 mr-4">Devolução:</span>
              {{ h.end_reservation_date }}
            </div>
          </div>
        </div>
  </div>

  <div v-else class="grid grid-rows-2 md:flex md:items-center md:justify-center ">
    <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
      <img src="../../../public/images/empty.svg" alt="Imagem de erro" class="w-1/2 h-1/2 object-cover">
      <h1 class="text-2xl">Não existe histórico de reservas</h1>
    </div>
  </div>

</template>

<style scoped>
.table {
  border-spacing: 0 12px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+7),
tr th:nth-child(n+7) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}
</style>