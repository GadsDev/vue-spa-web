import Cookie from '@/service/cookie';
import axios from 'axios';

export default {
    async redirectIfNotAuthenticated(to, from, next) {
        const token = Cookie.getToken();
        let n;

        if (!token) {
            n = {name: 'login'};
        }

        // Verificar se o token está valido
        await axios.get('v1/me').catch(() => {
            Cookie.deleteToken();
            n = {name: 'login'};
        });

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
