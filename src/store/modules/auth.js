export default {
    state() {
        return {
            user: null,
            token: null
        }
    },
    getters: {
        
    },
    actions: {
        setUser({commit}, userData) {
            commit('setUser', userData)
        },
    },
    mutations: {
        setUser(state, userData) {
            console.log('userdata in store', userData);
            state.user = userData.login;
            state.token = userData.token;
        },
    }
}