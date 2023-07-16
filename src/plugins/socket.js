import { io } from "socket.io-client";
import store from '@/store/index.js';

const URL = "http://localhost:4000";
const socket = io(URL, {
    // autoConnect: false,
transportOptions: {
polling: {
 extraHeaders: {
   'token': localStorage.getItem('token'),
 },
},
},
});

// Update view on recieving message by socket
socket.on("messagePublished", (msg) => {
  console.log('on message %%', msg);
  if (msg.chatRoomId === store.getters.getActiveRoomId) {
        store.dispatch('appendMessage', {
        login: msg.login,
        text: msg.message,
        createdAt: msg.createdAt,
        isAuthorOwner: msg.isAuthorOwner,
        isServiceMessage: msg.isServiceMessage,
    })
  } else {
    console.log('ELSE', 'todo show label NEW in non selected chat room id');
  }

});

socket.onAny((event, ...args) => {
    console.log('*', event, args, 'socketId', socket.id);
});

export default socket;