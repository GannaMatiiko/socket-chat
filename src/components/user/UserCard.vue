<template>
    <div @click="selectUser(user.id)" class="user-card" :class="{active: isCurrUserActive}">
        <span v-if="user.isGeneral">
            <img class="user-img" src="@/assets/general.png">
        </span>
        <span v-else>
            <span class="user-img" :style="getRandomColor">{{ createInitials(user.name) }}</span>
        </span>

        <div class="user-name">{{ user.name }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
            }
        },
        methods: {
            createInitials(name) {
                return name.slice(0, 2).toUpperCase()
            },
            selectUser(id) {
                this.$store.dispatch('setUser', id)
            }
        },
        computed: {
            getRandomColor() {
                return {
                    backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
                }
            },
            isCurrUserActive() {
                return this.$store.getters.getSelectedUser === this.chat.id
            }
        }
    }
</script>

<style lang="scss" scoped>
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
                background: $yellow;
                color: white;
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