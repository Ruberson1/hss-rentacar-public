import { defineStore } from 'pinia';
import axios from "axios";
import swal from "sweetalert2";
import router from '../../router';
import {formatDate} from "../../shared/utils.js";

export const useCarStore = defineStore({

    id: 'car',
    state: () => ({
        cars: null,
        availableCars: null
    }),

    getters: {
        getAvailableCars: (state: any) => state.availableCars,
        getCars: (state: any) => state.car,
    },
    actions: {
        async handleAvailableCars(form: any) {
            const  params = new URLSearchParams();
            params.append('start_reservation_date', formatDate(form.startDate));
            params.append('end_reservation_date', formatDate(form.endDate));
            params.append('category_id', form.categoryId);
            try {
                const data = await axios.get('/car/available',{
                    params: params
                });
                this.availableCars = data.data;
                swal.close();
            } catch (e: any) {
                console.error(e);
            }
        },
        async handleGetCars() {
            try {
                const data = await axios.get(`/car/list`);
                this.cars = data.data;
                swal.close();
            } catch (e: any) {
                console.error(e);
            }
        },
    }
});