import axiosConfig from '@/plugins/axiosConfig';

export default {
    state() {
        return {
            // selectedUser: null,
            chatMessages: [],
            chatRooms: [],
            chanelUsers: [],
            allAppUsers: [],
            activeRoomId: null,
            activeRoomType: String,
            isMessagesLoading: true
        }
    },
    getters: {
    //     getSelectedUser(state) {
    //         return state.selectedUser
    //     },
        getChatMessages(state) {
            return state.chatMessages;
        },
        getIsMessagesLoading(state) {
            return state.isMessagesLoading;
        },
        loadChatRooms(state) {
            return state.chatRooms;
        }, 
        getActiveRoomId(state) {
            return state.activeRoomId;
        },
        getActiveRoomType(state) {
            return state.activeRoomType;
        },
        getChanelUsers(state) {
            return state.chanelUsers;
        },
        getAllAppUsers(state) {
            return state.allAppUsers;
        },
        getDialogueChatsIds(state) {
            return state.chatRooms.filter(room => room.isDialogue).map(item => item._id);
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
        storeActiveRoomType({commit}, isDialogue) {
            commit('storeActiveRoomType', isDialogue);
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
                await context.commit('storeAllAppUsers', res.data.users);
                await context.commit('loadRoomMembers', res.data.users);
            } catch (error) {
                console.error(error);
            }
        },
        addNewChat({commit}, chatRoom) {
            commit('addNewChat', chatRoom);
        },
        async selectChatInfo(context, roomObj) {
            if (context.getters.getActiveRoomId === roomObj.roomId) {
                return
            }
            context.dispatch('storeActiveRoomId', roomObj.roomId);
            context.dispatch('storeActiveRoomType', roomObj.isDialogue);

            try {
                const res = await axiosConfig.get(`/room/${roomObj.roomId}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
                })
                context.state.isMessagesLoading = false;
                await context.dispatch('loadRoomMessages', res.data.conversation);
                await context.dispatch('loadRoomMembers', res.data.users);
                // for removing icon with new message
                context.state.chatRooms = context.state.chatRooms.map(room =>
                    room._id === roomObj.roomId ? { ...room, hasNewMsg: false } : room
                );
            } catch (error) {
                console.error(error);
            }
        },
        notifyAboutNewMessageInRoom({commit}, chatRoomId) {
            commit('notifyAboutNewMessageInRoom', chatRoomId)
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
        storeActiveRoomType(state, isDialogue) {
            state.activeRoomType = isDialogue ? 'dialogue' : 'chanel';
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
        storeAllAppUsers(state, users) {
            state.allAppUsers = users;
        },
        addNewChat(state, chatRoom) {
            state.chatRooms.push(chatRoom);
        },
        notifyAboutNewMessageInRoom(state, chatRoomId) {
            state.chatRooms = state.chatRooms.map(room =>
                room._id === chatRoomId ? { ...room, hasNewMsg: true } : room
            );
        }
    }
}