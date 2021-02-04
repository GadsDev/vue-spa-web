import Vue from 'vue';
import VueRouter from 'vue-router';

import LayoutAuth from '../layouts/Auth.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import VerifyEmail from '@/views/VerifyEmail';
import ForgotPassword from '@/views/ForgotPassword';
import ResetPassword from '@/views/ResetPassword';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login', component: LayoutAuth,
        children: [
            { path: '', name: 'login', component: Login },
        ],
    },
    {
        path: '/register', component: LayoutAuth,
        children: [
            { path: '', name: 'register', component: Register },
        ],
    },
    {
        path: '/verify-email', component: LayoutAuth,
        children: [
            { path: '', name: 'verifyEmail', component: VerifyEmail },
        ],
    },
    {
        path: '/forgot-password', component: LayoutAuth,
        children: [
            { path: '', name: 'forgotPassword', component: ForgotPassword },
        ],
    },
    {
        path: '/reset-password', component: LayoutAuth,
        children: [
            { path: '', name: 'resetPassword', component: ResetPassword },
        ],
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
