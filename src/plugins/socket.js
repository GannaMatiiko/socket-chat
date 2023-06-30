import { io } from "socket.io-client";

const URL = "http://localhost:4000";
console.log(localStorage.getItem('token'));
const socket = io(URL, {
    // autoConnect: false,
transportOptions: {
polling: {
 extraHeaders: {
   //todo тут реальный токен юзера подставить
   //todo во второй итерации (когда тут заработает) Authorization заменить на authToken и слать сразу токен без Bearer и пробела
   'Authorization': `Bearer ${localStorage.getItem('token')}`,
 },
},
},
});

socket.onAny((event, ...args) => {
    console.log('*', event, args, 'socketId', socket.id);
});

export default socket;