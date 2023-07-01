<template>
    <div class="chatplace">
        <div v-if="!roomChosen" class="chatplace-text">Choose chat to begin</div>
        <div v-else >
            <div class="chatplace-messages">
                <UserChat v-for="msg in chatMessages" :msg="msg" :key="msg._id"></UserChat>
            </div>
            <div class="chatplace-textarea">
                <FormMessage></FormMessage>
            </div>
        </div>
    </div>
</template>

<script>
    import UserChat from './user/UserChat.vue'
    import FormMessage from './forms/FormMessage.vue'
    // import UserList from './UserList.vue'
    export default {
        components: {
            UserChat,
            FormMessage,
            // UserList
        },
        data() {
            return {
            }
        },
        computed: {
            roomChosen() {
                return this.$store.getters.getActiveRoomId;
            },
            chatMessages() {
                return this.$store.getters.getChatMessages;  
            }
        }
    }
</script>

<style lang="scss" >
    .chatplace {
        width: 80vw;
        height: calc(100vh - 64px);
        background: #eeeeee;
        &-text {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: $darkGreen;
        }
        &-messages {
            padding: 30px;
            max-height: 69vh;
            height: 69vh;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                width: 10px;
            }
            &::-webkit-scrollbar-track {
                background: #cfcfcf;
            }
            &::-webkit-scrollbar-thumb {
                background: $green;
            }
        }
        &-textarea {
            max-height: 18vh;
            padding: 30px;
        }
    }
    // .v-messages {
    //     display: flex;
    //     &__message {
    //         margin-right: 15px;
    //     }
    // }
</style>