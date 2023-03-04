export default {
    state() {
        return {
            selectedUser: null
        }
    },
    getters: {
        getSelectedUser(state) {
            return state.selectedUser
        }
    },
    actions: {
        setUser({commit}, id) {
            commit('setUser', id)
        }
    },
    mutations: {
        setUser(state, id) {
            state.selectedUser = id
        }
    }
}