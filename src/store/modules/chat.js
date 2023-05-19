export default {
    state() {
        return {
            // selectedUser: null,
            chatMessages: []
        }
    },
    getters: {
    //     getSelectedUser(state) {
    //         return state.selectedUser
    //     },
        getChatMessages(state) {
            return state.chatMessages;
        }
    },
    actions: {
        // TODO remove setUser, cause login replaces it
        // setUser({commit}, id) {
        //     commit('setUser', id)
        // },
        appendMessage({commit}, text) {
            commit('appendMessage', text)
        }
    },
    mutations: {
        // setUser(state, id) {
        //     state.selectedUser = id
        // },
        appendMessage(state, text) {
            state.chatMessages.push(text)
        }
    }
}