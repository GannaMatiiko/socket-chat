import axiosConfig from '@/plugins/axiosConfig';

export default {
    state() {
        return {
            // selectedUser: null,
            chatMessages: [],
            chatRooms: [],
            chanelUsers: [],
            activeRoomId: null,
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
        },
        getChanelUsers(state) {
            return state.chanelUsers;
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
        },
        loadRoomMessages({commit}, messages) {
            commit('loadRoomMessages', messages);
        },
        loadRoomMessagesRecent({commit}, messages) {
            commit('loadRoomMessagesRecent', messages);
        },
        loadRoomMembers({commit}, users) {
            commit('loadRoomMembers', users);
        },
        async loadAllUsers(context) {
            try {
                const res = await axiosConfig.get(`/users`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
                })
                await context.commit('loadRoomMembers', res.data.users);
            } catch (error) {
                console.error(error);
            }
        },
        addNewChat({commit}, chatRoom) {
            commit('addNewChat', chatRoom);
        },
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
        },
        loadRoomMessages(state, messages) {
            state.chatMessages = messages;
        },
        loadRoomMessagesRecent(state, messages) {
            state.chatMessages.unshift(...messages);
        },
        loadRoomMembers(state, users) {
            state.chanelUsers = users;
        },
        addNewChat(state, chatRoom) {
            state.chatRooms.push(chatRoom);
        }
    }
}