<template>
    <v-form @submit.prevent="sendMessage" class="send-form">
        <v-textarea @keydown.enter.prevent="sendMessage" v-model="messageText" label="Write a message" variant="outlined" no-resize :messages="showChatCommands"></v-textarea>
        <v-btn type="submit" class="send-form__btn mt-2">Send</v-btn>
    </v-form>
</template>

<script>
import moment from 'moment';
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
        computed: {
            showChatCommands() {
                return this.chatType === 'room' ? this.chatCommands : this.chatCommands.slice(0, 2)
            }
        },
        methods: {
            sendMessage() {
                this.$socketio.emit('chat message', this.messageText);
                this.$store.dispatch('appendMessage', {
                    id: this.$store.getters.getSelectedUser,
                    user: "Valeriy",
                    roomId: "general",
                    text: this.messageText,
                    // date: "2023-02-21 19:22:44"
                    // date: moment().format('[today] HH:mm')
                });
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