<template>
    <!-- <div @click="selectUser(user._id)" class="user-card" :class="{active: isCurrUserActive}"> -->
    
        <!-- TEMPORARY -->
    <div class="user-card" :class="{active: isCurrUserActive}">
        <!-- <span v-if="user.isGeneral">
            <img class="user-img" src="@/assets/general.png">
        </span>
        <span v-else>
            <span class="user-img" :style="getRandomColor">{{ createInitials(user.name) }}</span>
        </span> -->
        <v-icon
            v-if="user.isService"
            size="default"
            color="orange-darken-1"
            icon="mdi-music-accidental-sharp"
            class="mr-1"
        ></v-icon>
        <v-icon
            v-else-if="user.isDialogue"
            size="default"
            color="lime-darken-3"
            icon="mdi-account-multiple"
            class="mr-1"
        ></v-icon>
        <v-icon
            v-else-if="!user.isDialogue"
            size="default"
            color="green-darken-3"
            icon="mdi-bullhorn"
            class="mr-1"
        ></v-icon>
        <div class="user-name">{{ user.name }}</div>

        <v-spacer></v-spacer>

        <AddGroupMemebersModal 
            v-if="!user.isDialogue && !user.isService" 
            :roomId="user._id" 
            :roomName="user.name"
        ></AddGroupMemebersModal>
    </div>
</template>

<script>
    import AddGroupMemebersModal from '@/components/modals/AddGroupMemebersModal.vue';
    export default {
        components: {
            AddGroupMemebersModal
        },
        props: {
            user: {
                type: Object,
            }
        },
        methods: {
            // createInitials(name) {
            //     return name.slice(0, 2).toUpperCase()
            // },
            // selectUser(id) {
            //     this.$store.dispatch('setUser', id)
            // }
            addGroupMembers() {
                console.log('yezhik');
            }
        },
        computed: {
            // getRandomColor() {
            //     return {
            //         backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
            //     }
            // },
            isCurrUserActive() {
                return this.$store.getters.getActiveRoomId === this.user._id
            }
        }
    }
</script>

<style lang="scss">
    .user {
        &-card {
            display: flex;
            align-items: center;
            padding: 15px;
            cursor: pointer;
            transition: 0.6s;
            &:hover {
                background:#DCDCDC;
            }
            &.active {
                background: $darkGreen;
                color: $yellow;
                .text-left {
                    .user-label_add-person {
                        background: #B2DFDB;
                    }
                }
            }
        }
        &-img {
            width: 32px;
            height: 32px;
            margin-right: 10px;
            object-fit: cover;
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            padding-top: 5px;
            font-weight: 700;
        }
        &-name {
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap; 
            overflow: hidden;
        }
    }
</style>