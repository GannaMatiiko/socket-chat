<template>
    <v-form @submit.prevent="sendMessageText" class="send-form">
        <v-textarea @keydown.enter.prevent="sendMessageText" v-model="messageText" label="Write a message" variant="outlined" no-resize :messages="showChatCommands"></v-textarea>
        <v-btn type="submit" class="send-form__btn mt-2">Send</v-btn>
    </v-form>
</template>

<script>
// import dateFns from 'date-fns';
import { format } from 'date-fns'
import socket from '@/plugins/socket.js'
    export default {
        data() {
            return {
                messageText: '',
                chatType: 'room',
                chatCommands: [
                    '/date',
                    '/me some string',
                    '/show members'
                ],
            }
        },
        created() {
            console.log('IN CREATED');
            // const token = localStorage.getItem("token");
            // if (token) {
            // socket.auth = { token };
            // socket.connect();
            // socket.emit('sendMessage', new Date().getMilliseconds());
            // }
            socket.connect();
          //  socket.emit('sendMessage', 'valer' + new Date().getMilliseconds());
            console.log('socket', socket);

            socket.on("connect_error", (err) => {
            if (err.message === "error user") {
                console.log('Oops, connect error');
            }
            });
        },
        unmounted() {
            socket.off("connect_error");
        },
        computed: {
            showChatCommands() {
                return this.chatType === 'room' ? this.chatCommands : this.chatCommands.slice(0, 2)
            }
        },
        methods: {            
            checkSpecialChatCommands(value) {
                if (value === '/date') {
                    this.messageText = format(new Date(), 'PP ');
                }
                if (value.substring(0, 4) === '/me ') {
                    console.log('ME!!!');
                    const userName = localStorage.getItem('login');
                    this.messageText = `${userName.toUpperCase()} ${value.slice(4)}`
                }
            },
            sendMessageText() {
                this.checkSpecialChatCommands(this.messageText);
                this.$store.dispatch('appendMessage', {
                    // id: this.$store.getters.getSelectedUser,
                    login: localStorage.getItem('login'),
                    text: this.messageText,
                    createdAt: format(new Date(), 'yyyy-MM-DDD HH:mm:ss'),
                    isAuthorOwner: true,
                    isServiceMessage: false,
                    styled: true
                    // date: moment().format('[today] HH:mm')
                });
               
                console.log('before socket Send Message'); 
                socket.emit('sendMessage', this.messageText, '1be7db8a32ab40fd9f45a860b5540ba9');   
                this.messageText = ''
            }
        }
    }
</script>

<style lang="scss">
    .v-messages {
        display: flex;
        &__message {
            margin-right: 15px;
        }
    }
    .send-form {
        position: relative;
        &__btn {
            position: absolute;
            bottom: -20px;
            right: 0;
        }
    }
</style>