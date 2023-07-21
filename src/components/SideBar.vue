<template>
    <div class="sidebar">
        <UserCard v-for="user in users" :user="user" :key="user._id" @click="selectChatInfo(user._id)"></UserCard>
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
            selectChatInfo(roomId) {
                this.$store.dispatch('selectChatInfo', roomId);
            }
            // selectCurrentRoomId(roomId) {
            //     this.$store.dispatch('storeActiveRoomId', roomId);
            // },
            // selectChatInfo(roomId) {
            //     console.log('roomId!!!', roomId);
            //     if (this.$store.getters.getActiveRoomId === roomId) {
            //         return
            //     }
                
            //     this.selectCurrentRoomId(roomId);

            //     this.axios.get(`/room/${roomId}`, {
            //         headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            //     })
            //     .then(res => {
            //         this.$store.dispatch('loadRoomMessages', res.data.conversation);
            //         this.$store.dispatch('loadRoomMembers', res.data.users);
            //     })
            //     .catch(error => console.error(error))
            // }
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

