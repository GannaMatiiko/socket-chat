import { io } from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log('*', event, args, 'socketId', socket.id);
});

export default socket;