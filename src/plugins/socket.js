import { io } from "socket.io-client";
import store from '@/store/index.js';

const URL = import.meta.env.VITE_BACKEND_HOST;
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


export default socket;