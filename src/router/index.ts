import {createRouter, createWebHistory} from "vue-router";
import LoginView from "../view/LoginView.vue";
import NotFoundView from "../view/NotFoundView.vue";
import HomeView from "../view/HomeView.vue";
import CategoryView from "../view/CategoryView.vue";
import ReservationCustomerFormView from "../view/ReservationCustomerFormView.vue";
import ReservationListView from "../view/ReservationListView.vue";
import ReservationFormView from "../view/ReservationFormView.vue";
import HistoryView from "../view/HistoryView.vue";
import CarListView from "../view/CarListView.vue";
import UsersView from "../view/UsersView.vue";




const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        // {
        //     path: '/forgot-pass',
        //     name: 'forgotPass',
        //     component: ForgotPassView
        // },
        // {
        //     path: '/password-reset/:token',
        //     name: 'newPass',
        //     component: NewPassView
        // },
        {
            path: '/categories',
            name: 'categories',
            component: CategoryView
        },
        {
            path: '/cars',
            name: 'cars',
            component: CarListView
        },
        // {
        //     path: '/cars/:carId',
        //     name: 'carsEdit',
        //     component: CarEditView
        // },
        {
            path: '/reservations',
            name: 'reservations',
            component: ReservationListView
        },
        {
            path: '/reservation/customer/:categoryId',
            name: 'reservationForm',
            component:  ReservationCustomerFormView
        },
        {
            path: '/reservation/:reservationId',
            name: 'reservationEdit',
            component:  ReservationFormView
        },
        {
            path: '/history',
            name: 'history',
            component:  HistoryView
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView
        },
        // {
        //     path: '/users/:userId?',
        //     name: 'usersForm',
        //     component: UserEditView
        // },
        // {
        //     path: '/users/:userId?',
        //     name: 'usersForm',
        //     component: UserEditView
        // },
        {
            path: '/404',
            name: 'not-found',
            component: NotFoundView
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404',
        },


    ],

})


router.beforeEach((to, from, next) => {
    // Verifica se o usuário está autenticado e se a rota atual é diferente da página de login
    const token = sessionStorage.getItem('token');
    if (token === null
        && to.name !== 'login'
        && to.name !== 'social'
        && to.name !== 'not-found'
    ) {
        // Se o usuário não estiver autenticado, redirecione-o para a página de login
        next({ name: 'login' });
    } else {
        // Caso contrário, permita o acesso à rota
        next();
    }
});
// @ts-ignore
export default router