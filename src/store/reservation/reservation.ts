import { defineStore } from 'pinia';
import axios from "axios";
import swal from "sweetalert2";
import router from '../../router';
import { formatDate } from "../../shared/utils.js"
import {useAuthStore} from "../auth/auth";


export const useReservationStore = defineStore({

    id: 'reservation',
    state: () => ({
        reservations: null,
        histories: null,
        reservation: null,
        reservationErrors: [],
    }),

    getters: {
        getReservations: (state: any) => state.reservations,
        getHistories: (state: any) => state.histories,
        getReservation: (state: any) => state.reservation,
        errors: (state: any) => state.reservationErrors,
    },
    actions: {
        async handleRegisterReservation(form: any) {
            this.reservationErrors = [];
            const authStore = useAuthStore();
            await authStore.getUser();
            const userId = authStore.user.id;
            try {
                const resp = await axios.post('reservation/register', {
                    category_id: form.categoryId,
                    user_id: userId,
                    start_reservation_date: formatDate(form.startDate),
                    end_reservation_date: formatDate(form.endDate),
                });
                swal.fire({
                    title: "Tudo certo!",
                    text: resp.data.message,
                    icon: "success"
                }).then(() => {
                    router.push("/history");
                });

            } catch (e: any ) {
                swal.close();
                if (e.response.status === 422) {
                    this.reservationErrors = e.response.data.errors;
                }
            }
        },

        async handleFechtReservations() {
            try {
                const data = await axios.get('/reservation/list');
                this.reservations = data.data;
                swal.close();
            } catch (e) {
                swal.close();
                console.error(e);
            }
        },

        async handleFechtHistories() {
            try {
                const data = await axios.get('/reservation/history');
                this.histories = data.data;
                swal.close();
            } catch (e: any) {
                swal.close();
                console.error(e);
            }
        },

        async handleGetReservationById(reservationId: any) {
            try {
                const data = await axios.get(`/reservation/${reservationId}`);
                this.reservation = data.data;
                swal.close();
            } catch (e: any) {
                swal.close();
                console.error(e);
            }
        },

        async handleUpdateReservation(form: any) {
            this.reservationErrors = [];

            try {
                const resp = await axios.put(`/reservation/${form.reservationId}`,{
                    car: form.car,
                    user_id: form.userId,
                    start_reservation_date: formatDate(form.startDate),
                    end_reservation_date: formatDate(form.endDate)
                });
                this.reservation = resp.data;
                swal.fire({
                    title: "Tudo certo!",
                    text: resp.data.message,
                    icon: "success"
                }).then(() => {
                    router.push("/history");
                });
            } catch (e: any) {
                swal.close();
                if (e.response.status === 422) {
                    this.reservationErrors = e.response.data.errors;
                }
                if(e.response.status === 403) {
                    await swal.fire({
                        title: "Ops!",
                        text: e.response.data.error,
                        icon: "error"
                    })
                }
            }
        },
    }
});