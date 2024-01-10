import { defineStore } from 'pinia';
import axios from "axios";
import swal from "sweetalert2";
import router from '../../router';
import { formatDate } from "../../shared/utils.js"
import {useAuthStore} from "../auth/auth";


export const useUserStore = defineStore({

    id: 'user',
    state: () => ({
        users: null,
        user: null,
    }),

    getters: {
        getUsers: (state: any) => state.users,
        getUser: (state: any) => state.user,
    },
    actions: {

        async handleFechtUsers() {
            try {
                const data = await axios.get('/auth/user-list');
                this.users = data.data;
                swal.close();
            } catch (e) {
                swal.close();
                console.error(e);
            }
        },

        async handleGetUserById(reservationId: any) {
            try {
                const data = await axios.get(`/user/${reservationId}`);
                this.user = data.data;
                swal.close();
            } catch (e: any) {
                swal.close();
                console.error(e);
            }
        },

    }
});