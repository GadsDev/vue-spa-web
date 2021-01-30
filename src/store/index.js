import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import user from '@/store/user';

Vue.use(Vuex);

export default new Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
    },
});
