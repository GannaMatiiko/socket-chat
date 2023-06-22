export default {
    state() {
        return {
            // selectedUser: null,
            chatMessages: [],
            chatRooms: [],
            activeRoomId: null
        }
    },
    getters: {
    //     getSelectedUser(state) {
    //         return state.selectedUser
    //     },
        getChatMessages(state) {
            return state.chatMessages;
        },
        loadChatRooms(state) {
            return state.chatRooms;
        },
        getActiveRoomId(state) {
            return state.activeRoomId;
        }
    },
    actions: {
        // TODO remove setUser, cause login replaces it
        // setUser({commit}, id) {
        //     commit('setUser', id)
        // },
        appendMessage({commit}, text) {
            commit('appendMessage', text)
        },
        loadChatRooms({commit}, chatRooms) {
            commit('loadChatRooms', chatRooms)
        },
        storeActiveRoomId({commit}, roomId) {
            commit('storeActiveRoomId', roomId);
        }
    },
    mutations: {
        // setUser(state, id) {
        //     state.selectedUser = id
        // },
        appendMessage(state, text) {
            state.chatMessages.push(text)
        },
        loadChatRooms(state, rooms) {
            state.chatRooms = rooms;
        },
        storeActiveRoomId(state, roomId) {
            state.activeRoomId = roomId;
        }
    }
}