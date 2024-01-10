import { defineStore } from 'pinia';
import axios from "axios";
import router from '../../router';
import swal from "sweetalert2";
import {decrypt, encrypt} from "../../shared/utils.js";

export const useAuthStore = defineStore({

    id: 'auth',
    state: () => ({
        showNameInput: false,
        isRegistering: false,
        buttonLabel: 'Entrar',
        questionLabel: 'Não tem uma conta?',
        buttonRegisterLabel: 'Cadastre-se',
        authErrors: [],
        authStatus: '',
        userPerm: '',
        authUser: ''

    }),

    getters: {
        user: (state: any) => state.authUser,
        errors: (state: any) => state.authErrors,
        status: (state: any) => state.authStatus,
        permission: (state: any) => state.userPerm,
    },

    actions: {
        toggleRegistration() {
            this.isRegistering = !this.isRegistering;
            this.showNameInput = this.isRegistering;
            this.buttonLabel = this.isRegistering ? 'Cadastrar' : 'Entrar';
            this.questionLabel = this.isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?';
            this.buttonRegisterLabel = this.isRegistering ? 'Entrar' : 'Cadastre-se';
        },

        async handleForgotPass(email: any) {
            this.authErrors = [];
            try {
                const resp = await axios.post('/forgot-password', {email: email});
                this.authStatus = resp.data.status;
            } catch (e: any) {
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors;
                }
            }
        },

        async handleLoginOrRegister(form: any) {
            this.authErrors = [];
            if (this.isRegistering) {
                try {
                    await axios.post(`/auth/register`, {
                        name: form.name,
                        email: form.email,
                        cpf: form.cpf,
                        password: form.password,
                        password_confirmation: form.password_confirmation
                    });
                    swal.close();
                    window.location.reload();
                } catch (e: any) {
                    swal.close();
                    if (e.response.status === 422) {
                        console.log(e.response);
                        this.authErrors = e.response.data.errors;
                    }
                }
            } else {
                try{
                    const resp =await axios.post(`auth/login`, {
                        email: form.email,
                        password: form.password
                    });
                    swal.close();
                    const token = resp.data.access_token;
                    const user = encrypt(resp.data.user, import.meta.env.VITE_APP_ENCRYPT_KEY);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('user', user);
                    await router.push("/");
                } catch (e: any) {
                    swal.close();
                    if(e.response.status === 422) {this.authErrors = e.response.data.errors}
                }

            }
        },

        async getUser() {
            if(sessionStorage.getItem('user')){
              this.authUser = decrypt(sessionStorage.getItem('user'),import.meta.env.VITE_APP_ENCRYPT_KEY)
            }
        },

        async getPermission() {
           await this.getUser();
           const user = this.user;
           this.userPerm = user.permissions[0];
        },


        async handleLogout() {
            await axios.post("/auth/logout");
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            swal.close();
            await router.push("/login");
        },

        async handleResetPass(form: any) {
            this.authErrors = [];
            try {
                const resp = await axios.post('/reset-password', form);
                this.authStatus = resp.data.status;
                await router.push("/login");
            } catch (e: any) {
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors;
                }
            }
        },

        async handleUpdateUser(form: any) {
            this.authErrors = [];
            try {
                const resp = await axios.put(`/user/${form.userId}`, {
                    name: form.userName,
                    email: form.userEmail
                });
                // await router.push("/");
            } catch (e: any) {
                console.log(e);
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors;
                }
            }
        }
    }
});