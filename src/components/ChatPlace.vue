<template>
    <div class="chatplace">
        <div v-if="!roomChosen" class="chatplace-text">Choose chat to begin</div>
        <div v-else>

            <v-container style="height: 69vh;" v-if="getIsMessagesLoading">
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                <v-col class="text-subtitle-1 text-center" cols="12">Loading chat messages</v-col>
                <v-col cols="6">
                    <v-progress-linear
                        color="yellow-darken-3"
                        indeterminate
                        rounded
                        height="6"
                    ></v-progress-linear>
                </v-col>
                </v-row>
            </v-container>

            <div v-else class="chatplace-messages" ref="chatplaceMessages" @scroll="fetchChatHistory">
                <UserChat v-for="msg in chatMessages" :msg="msg" :key="msg._id"></UserChat>
                <!-- bottom place where scroll to -->
                <p ref="bottomRef"></p>
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
    export default {
        components: {
            UserChat,
            FormMessage,
        },
        data() {
            return {
                // isLoaded: false,
                pageToFetch: 0,
                toFireScroll: true,
                isMessageEnded: false,
                messagesPerPage: 20
            }
        },
        computed: {
            roomChosen() {
                return this.$store.getters.getActiveRoomId;
            },
            chatMessages() {
                return this.$store.getters.getChatMessages;  
            },
            getIsMessagesLoading() {
                return this.$store.getters.getIsMessagesLoading;
            }
        },
        watch: {
            roomChosen() {
                this.pageToFetch = 0;
                this.isMessageEnded = false;
                this.toFireScroll = true;
            }
        },
        methods: {
            fetchChatHistory() {
                if (this.$refs.chatplaceMessages.scrollTop === 0) {
                    let initialHeight = this.$refs.chatplaceMessages.scrollHeight;
                    this.toFireScroll = false;
                    this.pageToFetch += 1;

                    if (!this.isMessageEnded) {
                        this.axios.get(`room/${this.roomChosen}/?page=${this.pageToFetch}`, {
                            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
                        })
                        .then(res => {
                            console.log('res where is conversation?', res.data);
                            // to avoid unnecessary request to server
                            if (res.data.conversation.length < this.messagesPerPage) {
                                this.isMessageEnded = true
                            }
                            this.$store.dispatch('loadRoomMessagesRecent', res.data.conversation);

                            // to store previous chat scroll position on load recent messages
                            this.$nextTick(() => {
                                this.$refs.chatplaceMessages.scrollTop = this.$refs.chatplaceMessages.scrollHeight - initialHeight;
                            })
                        })
                        .catch(error => console.error(error));
                    }
                }
            }
        },
        updated() {
            // scroll to the end of chat
            if (!this.toFireScroll) return;

            let bottomRef = this.$refs.bottomRef;
            if (bottomRef) {
                bottomRef.scrollIntoView({block: "end", behavior: "smooth"});
            }
        },
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
            padding: 30px 30px 0 30px;
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