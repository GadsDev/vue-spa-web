import Cookie from '@/service/cookie';

export default {
    redirectIfNotAuthenticated(to, from, next) {
        const token = Cookie.getToken();
        let n;

        if (!token) {
            n = {name: 'login'};
        }

        // Verificar se o token está valido

        next(n);
    },
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();
        let n;

        if (token) {
           n = {name: 'index'};
        }

        next(n);
    },
};
