<template>
    <div class="chatplace">
        <div v-if="!getUser" class="chatplace-text">Choose chat to begin</div>
        <div v-else class="chatplace-inner">
            <UserChat v-for="msg in chatMessages" :msg="msg" :key="msg.id"></UserChat>
        </div>
    </div>
</template>

<script>
    import UserChat from './user/UserChat.vue'
    export default {
        components: {
            UserChat
        },
        data() {
            return {
                chatMessages: [
                    {
                        id: "63f3d8b3283c18ee1e7daa26",
                        user: "Valeriy",
                        roomId: "general",
                        text: "hello",
                        date: "2023-02-21 19:22:44"
                    },
                    {
                        id: "nadfnj23njin4fjbk",
                        user: "Boris",
                        roomId: "general",
                        text: "dobriy den evrybody",
                        date: "2023-02-21 19:22:44"
                    },
                    {
                        id: "gfggege",
                        user: "Boris",
                        roomId: "general",
                        text: "i don't believe",
                        date: "2023-02-21 19:22:49"
                    }
                ]
            }
        },
        computed: {
            getUser() {
                return this.$store.getters.getSelectedUser
            }
        }
    }
</script>

<style lang="scss">
    .chatplace {
        width: 80vw;
        height: calc(100vh - 64px);
        background: $lightGreen;
        &-text {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: $darkGreen;
        }
        &-inner {
            padding: 30px;
        }
    }
</style>