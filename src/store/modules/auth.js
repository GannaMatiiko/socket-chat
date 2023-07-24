export default {
    state() {
        return {
            user: null,
            token: null,
            userId: null
        }
    },
    getters: {
        getUserName(state) {
            return state.user;
        },
        getUserId() {
            return localStorage.getItem('userId');
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
            state.chatHistoryMode = userData.chatHistoryMode;
            localStorage.setItem('token', userData.token);
            localStorage.setItem('login', userData.login);
            localStorage.setItem('userId', userData._id);
            localStorage.setItem('chatHistoryMode', userData.chatHistoryMode._id);
        },
        logoutUser(state) {
            state.user = null;
            state.token = null;
            state.chatHistoryMode = null;
            this.state.chat.chatMessages = [];
            this.state.chat.chanelUsers = [];
            this.state.chat.chatRooms = [];
            this.state.chat.activeRoomId = null;
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            localStorage.removeItem('userId');
            localStorage.removeItem('chatHistoryMode');
        }
    }
}