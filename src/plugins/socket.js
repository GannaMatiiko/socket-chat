import { io } from "socket.io-client";
import store from '@/store/index.js';

const URL = import.meta.env.VITE_BACKEND_HOST;
// const URL = "https://chat-backend-ovl8.onrender.com";
const socket = io(URL, {
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
      }
    )
  } else {
    store.dispatch('notifyAboutNewMessageInRoom', msg.chatRoomId);
  }
});

socket.onAny((event, ...args) => {
    console.log('*', event, args, 'socketId', socket.id);
});

export default socket;