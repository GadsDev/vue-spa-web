<template>
    <div style="height: 300px;">
        <LoginMenu />

        <ValidationObserver
            tag="form"
            ref="loginForm"
            @submit.stop.prevent="login"
        >
            <div
                v-if="response.message"
                :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
            >
                <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                    {{ response.message }}
                </h3>
            </div>

            <div class="grid gap-2">
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="E-mail"
                >
                    <input
                        autofocus
                        v-model="email"
                        type="text"
                        placeholder="Digite seu e-mail"
                        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                    >
                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-sm mb-2"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>

                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Senha"
                >
                    <input
                        autocomplete
                        v-model="password"
                        type="password"
                        placeholder="Digite sua senha"
                        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                    >
                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-sm mb-2"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>


                <button
                    type="submit"
                    :disabled="spinner.login"
                    class="flex items-center justify-center bg-blue-800 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                >
                    <img
                        v-if="spinner.login"
                        src="@/assets/img/spinner.svg"
                        alt=""
                        class="w-5 h-5 mr-2"
                    >

                    ENTRAR
                </button>

                <div class="my-4 text-center">
                    <RouterLink
                        :to="{ name: 'forgotPassword' }"
                        class="text-sm font-light"
                    >
                        Esqueci minha senha
                    </RouterLink>
                </div>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import LoginMenu from '@/components/Auth/LoginMenu.vue';
    import Cookie from 'js-cookie';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    export default {
        name: 'Login',

        components: {
            ValidationProvider,
            ValidationObserver,
            LoginMenu,
        },

        data() {
            return {
                email: '',
                password: '',
                response: {
                    color: '',
                    message: '',
                },
                spinner: {
                    login: false,
                },
            };
        },

        methods: {
            async login() {
                if(!await this.$refs.loginForm.validate()) return false;
                const payload = {
                    email: this.email,
                    password: this.password,
                };

                const response = await this.$axios.post('v1/login', payload);
                const token = `${response.data.token_type} ${response.data.access_token}`;
                Cookie.set('_todolist_token', token, { expires: 30});

                this.$store.commit('user/STORE_USER', response.data.data);
            },

            resetResponse() {
                this.response.color = '';
                this.response.message = '';
            },
        },
    };
</script>