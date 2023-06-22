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
            selectCurrentRoomId(roomId) {
                this.$store.dispatch('storeActiveRoomId', roomId);
            },
            selectChatInfo(roomId) {
                this.selectCurrentRoomId(roomId);

                this.axios.get(`http://localhost:4000/room/${roomId}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
                })
                .then(res => console.log('555', res.data))
                .catch(error => console.error(error))
                }
        },
        mounted() {
            console.log(this.$store.getters.getActiveRoomId);
            this.axios.get('http://localhost:4000/users/chat-rooms', {
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
    }
</style>

