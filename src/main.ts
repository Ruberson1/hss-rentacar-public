import {createApp, markRaw} from 'vue'
import {createPinia} from "pinia";
import './style.css'
import router from './router';
import App from './App.vue'
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Tailwind from "primevue/passthrough/tailwind";
import swal from "sweetalert2";
import { useDark } from "@vueuse/core";

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;


const pinia = createPinia();
const app = createApp(App);
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

app.use(pinia)
app.use(router)
app.use(PrimeVue, { unstyled: false, pt: Tailwind });

app.mount('#app')






axios.interceptors.request.use(
    (config) => {
        const isDark = useDark()
        const background = isDark.value ? '#1f2937' : '#fff';
        const colorText = isDark.value ? '#9ca3af' : '#111827';
        const btnCollor = isDark.value ? '#06b6d4' : '#fbbf24';

        swal.fire({
            title: 'Carregando...',
            text: 'Por favor, aguarde...',
            color: colorText,
            background: background,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                swal.showLoading();
            }
        });
        return config;
    },
    (error) => {
        // Caso ocorra um erro na requisição
        swal.close();

        return Promise.reject(error);
    },
);
const publicRoutes = ['/login', '/register', 'forgot-password', 'reset-password'];
axios.interceptors.request.use(
    config => {
        swal.close();
        const token = sessionStorage.getItem('token');
        if (token && !publicRoutes.includes(<string>config.url)) { // verifica se a rota é privada
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        swal.close();
        return Promise.reject(error);
    }
);






