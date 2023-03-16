<template>
    <div class="chatplace">
        <div v-if="!getUser" class="chatplace-text">Choose chat to begin</div>
        <div v-else >
            <div class="chatplace-messages">
                <UserChat v-for="msg in chatMessages" :msg="msg" :key="msg.id"></UserChat>
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
            FormMessage
        },
        data() {
            return {
                chatMessages: []
                // chatMessages: [
                //     {
                //         id: "63f3d8b3283c18ee1e7daa26",
                //         user: "Valeriy",
                //         roomId: "general",
                //         text: "hello",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "nadfnj23njin4fjbk",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "dobriy den evrybody",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "gfggege",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "i don't believe In terms of technical expectations, I am looking for a company that actively works with modern web technologies and frameworks, including React and Redux. I am excited to work on projects that challenge me and allow me to develop my skills further. Additionally, I am eager to work with a team that values clean and well-structured code.",
                //         date: "2023-02-21 19:22:49"
                //     },
                //     {
                //         id: "63f3d8b3283c18ee1e7daa26",
                //         user: "Valeriy",
                //         roomId: "general",
                //         text: "hello",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "nadfnj23njin4fjbk",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "dobriy den evrybody",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "gfggege",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "i don't believe In terms of technical expectations, I am looking for a company that actively works with modern web technologies and frameworks, including React and Redux. I am excited to work on projects that challenge me and allow me to develop my skills further. Additionally, I am eager to work with a team that values clean and well-structured code.",
                //         date: "2023-02-21 19:22:49"
                //     },
                //     {
                //         id: "63f3d8b3283c18ee1e7daa26",
                //         user: "Valeriy",
                //         roomId: "general",
                //         text: "hello",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "nadfnj23njin4fjbk",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "dobriy den evrybody",
                //         date: "2023-02-21 19:22:44"
                //     },
                //     {
                //         id: "gfggege",
                //         user: "Boris",
                //         roomId: "general",
                //         text: "i don't believe In terms of technical expectations, I am looking for a company that actively works with modern web technologies and frameworks, including React and Redux. I am excited to work on projects that challenge me and allow me to develop my skills further. Additionally, I am eager to work with a team that values clean and well-structured code.",
                //         date: "2023-02-21 19:22:49"
                //     }
                // ]
            }
        },
        computed: {
            getUser() {
                return this.$store.getters.getSelectedUser
            },
            // chatMessages() {
            //     return this.$store.getters.getChatMessages;
            // }
        },
        created() {
            console.log('created');
            this.$socketio.on('loadDefaultChatMessages', (data) => {
                console.log('data inside created', data);
            })
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