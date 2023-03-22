<template>
    <div class="sidebar">
        <UserCard v-for="user in users" :user="user" :key="user.id"></UserCard>
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
                users: []
            //     chatsList: [
            //     {
            //         id: "wdok7733",
            //         name: "General channel",
            //         type: "room",
            //         isGeneral: true,
            //         members: [
            //             "Valeriy",
            //             "Boris",
            //             "Hanna",
            //             "Messi",
            //             "Foorest Gump"
            //         ]
            //     },
            //     {
            //         id: "9f939ukkss133",
            //         name: "Valeriy",
            //         type: "private"
            //     },
            //     {
            //         id: "n6n65n",
            //         name: "Gachimeni",
            //         type: "room",
            //         members: [
            //             "Valeriy",
            //             "Hanna"
            //         ]
            //     },
            //     {
            //         id: "oosdosdo",
            //         name: "Boris",
            //         type: "private"
            //     }
            // ]
            }
        },
    }
</script>

<style lang="scss">
    .sidebar {
        width: 20vw;
    }
</style>

