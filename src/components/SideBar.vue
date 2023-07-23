<template>
    <div class="sidebar">
        <UserCard v-for="user in users" :user="user" :key="user._id" @click="selectChatInfo(user._id, user.isDialogue)"></UserCard>
    </div>
    </template>

<script>
    import UserCard from '@/components/user/UserCard.vue'
    export default {
        components: {
            UserCard
        },
        data() {
            return {
                // users: []
            }
        },
        computed: {
            users() {
                return this.$store.getters.loadChatRooms;
            }
        },
        methods: {
            selectChatInfo(roomId, isDialogue) {
                const roomObj = {
                    roomId,
                    isDialogue
                }
                this.$store.dispatch('selectChatInfo', roomObj);
            }
        },
        mounted() {
            this.axios.get('/users/chat-rooms', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            })
            .then(res => this.$store.dispatch('loadChatRooms', res.data))
            .catch(error => console.error(error))
        }
    }
</script>

<style lang="scss">
    .sidebar {
        width: 20vw;
        max-height: 93.5vh;
        height: 93.5vh;
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
</style>

