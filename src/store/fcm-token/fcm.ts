import { defineStore } from 'pinia';
import axios from "axios";
import swal from "sweetalert2";

export const useFcmStore = defineStore({

    id: 'fcm',
    state: () => ({

    }),

    getters: {

    },
    actions: {
        async handleStoreTokenFcm(token: string) {

            try {
                 await axios.post('/token/store-token',{
                    token: token
                });
                swal.close();
            } catch (e: any) {
                swal.close();
                console.error(e);
            }
        },
    }
});