import Vue from 'vue';
import VueRouter from 'vue-router';

import LayoutAuth from '../layouts/Auth.vue';
import LayoutDefault from '../layouts/Default.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import VerifyEmail from '@/views/VerifyEmail';
import ForgotPassword from '@/views/ForgotPassword';
import ResetPassword from '@/views/ResetPassword';

import Home from '@/views/Home';
import Profile from '@/views/Profile';

import Guard from '@/service/middleware';

Vue.use(VueRouter);

const routes = [
    {
        path: '/', component: LayoutDefault,
        beforeEnter: Guard.redirectIfNotAuthenticated,
        children: [
            { path: '', name: 'index', component: Home },
            { path: '/profile', name: 'profile', component: Profile },
        ],
    },
    {
        path: '/login', component: LayoutAuth,
        beforeEnter: Guard.redirectIfAuthenticated,
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
