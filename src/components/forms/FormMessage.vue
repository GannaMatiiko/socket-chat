<template>
    <v-form @submit.prevent>
        <v-textarea label="Write a message" variant="outlined" no-resize :messages="showChatCommands"></v-textarea>
    <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
</template>

<script>
    export default {
        data() {
            return {
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
</style>