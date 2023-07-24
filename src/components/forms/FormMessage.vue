<template>
    <v-form @submit.prevent="sendMessageText" class="send-form">
        <v-textarea 
            @keydown.enter.prevent="sendMessageText" 
            v-model="messageText" 
            label="Write a message" 
            variant="outlined"
            no-resize
            :messages="showChatCommands"
        ></v-textarea>
        <v-btn type="submit" class="send-form__btn mt-2">Send</v-btn>
    </v-form>
    <v-snackbar v-model="emptyMsg" close-delay="text-center" :timeout="timeout" color="deep-orange-darken-2">
        Empty message!
    </v-snackbar>
</template>

<script>
import { format } from 'date-fns'
import socket from '@/plugins/socket.js'
    export default {
        data() {
            return {
                emptyMsg: false,
                timeout: 2000,
                messageText: '',
                isServiceMessage: false,
                chatCommands: [
                    '/date',
                    '/me some string',
                    '/show-members'
                ],
            }
        },
        created() {
            console.log('IN CREATED');
            socket.connect();
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
                return this.$store.getters.getActiveRoomType === 'dialogue' ? this.chatCommands.slice(0, 2) : this.chatCommands;
            },
            chatRoomId() {
                return this.$store.getters.getActiveRoomId;
            },
            roomUsers() {
                return this.$store.getters.getChanelUsers;
            }
        },
        methods: {            
            checkSpecialChatCommands(value) {
                if (value === '/date') {
                    this.messageText = format(new Date(), 'dd MMMM yyyy');
                }
                if (value.substring(0, 4) === '/me ') {
                    const userName = localStorage.getItem('login');
                    this.messageText = `${userName.toUpperCase()} ${value.slice(4)}`
                    this.isServiceMessage = true;
                }
                if (value === '/show-members') {
                    this.messageText = `Chat members: ${this.roomUsers.map(user => user.login).join(', ')}`;
                }
            },
            scrollToChatboxEnd() {
                let bottomRef = this.$parent.$refs.bottomRef;
                this.$nextTick(() => bottomRef.scrollIntoView({block: "end", behavior: "smooth"}))
            },
            sendMessageText() {
                if (this.messageText.length === 0) {
                    this.emptyMsg = true;
                    return;
                }
                this.checkSpecialChatCommands(this.messageText);
                this.$store.dispatch('appendMessage', {
                    login: localStorage.getItem('login'),
                    text: this.messageText,
                    createdAt: format(new Date(), 'dd.MM.yyyy HH:mm:ss'),
                    isAuthorOwner: true,
                    isServiceMessage: this.isServiceMessage,
                });
               
                console.log('before socket Send Message'); 
                socket.emit('sendMessage', this.messageText, this.chatRoomId, this.isServiceMessage);
                this.scrollToChatboxEnd();  
                this.messageText = '';
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