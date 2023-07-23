<template>
    <v-form @submit.prevent="sendMessageText" class="send-form" ref="sendMessageForm">
        <v-textarea 
            @keydown.enter.prevent="sendMessageText" 
            v-model="messageText" 
            label="Write a message" 
            variant="outlined"
            :rules="rulesMessageText"
            no-resize
            :messages="showChatCommands"
        ></v-textarea>
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
                valid: true,
                rulesMessageText: [
                    value => !!value || 'Required.',
                ],
                messageText: '',
                chatType: 'room',
                isServiceMessage: false,
                chatCommands: [
                    '/date',
                    '/me some string',
                    '/show members'
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
                return this.chatType === 'room' ? this.chatCommands : this.chatCommands.slice(0, 2)
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
                    this.messageText = format(new Date(), 'PP ');
                }
                if (value.substring(0, 4) === '/me ') {
                    console.log('ME!!!');
                    const userName = localStorage.getItem('login');
                    this.messageText = `${userName.toUpperCase()} ${value.slice(4)}`
                    this.isServiceMessage = true;
                }
                if (value === '/show members') {
                    console.log('SHHOW MEMBERES!');
                    this.messageText = `Chat members: ${this.roomUsers.map(user => user.login).join(', ')}`;
                }
            },
            scrollToChatboxEnd() {
                let bottomRef = this.$parent.$refs.bottomRef;
                this.$nextTick(() => bottomRef.scrollIntoView({block: "end", behavior: "smooth"}))
            },
            sendMessageText() {
                if (!this.messageText) {
                    return;
                }
                this.checkSpecialChatCommands(this.messageText);
                this.$store.dispatch('appendMessage', {
                    login: localStorage.getItem('login'),
                    text: this.messageText,
                    createdAt: format(new Date(), 'yyyy-MM-DDD HH:mm:ss'),
                    isAuthorOwner: true,
                    isServiceMessage: this.isServiceMessage,
                });
               
                console.log('before socket Send Message'); 
                socket.emit('sendMessage', this.messageText, this.chatRoomId, this.isServiceMessage);
                this.scrollToChatboxEnd();  
                this.messageText = '';
                this.$refs.sendMessageForm.reset();
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