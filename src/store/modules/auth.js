export default {
    state() {
        return {
            user: null,
            token: null
        }
    },
    getters: {
        getUserName(state) {
            return state.user;
        }
    },
    actions: {
        setUser({commit}, userData) {
            commit('setUser', userData)
        },
        logoutUser({commit}) {
            commit('logoutUser')
        },
    },
    mutations: {
        setUser(state, userData) {
            state.user = userData.login;
            state.token = userData.token;
            localStorage.setItem('token', userData.token);
            localStorage.setItem('login', userData.login);
        },
        logoutUser(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('login');
        }
    }
}