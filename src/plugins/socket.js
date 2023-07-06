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
  store.dispatch('appendMessage', {
      login: msg.login,
      text: msg.message,
      createdAt: msg.createdAt,
      isAuthorOwner: msg.isAuthorOwner,
      isServiceMessage: msg.isServiceMessage,
  });
});

socket.onAny((event, ...args) => {
    console.log('*', event, args, 'socketId', socket.id);
});

export default socket;