export default {
    namespaced: true,
    state: () => ({
        use: {},
    }),
    mutations: {
        STORE_USER(state, user) {
            state.user = user;
        },
    },
    actions: {},
};
