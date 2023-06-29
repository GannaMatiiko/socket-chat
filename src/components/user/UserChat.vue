<template>
    <UserMessage>
        <template #author>{{ msg.postedByUser.login }}</template>
        <template #text >
            <span>
            {{ msg.message }}</span>
        </template>
        <template #time>{{ formatTimeView }}</template>
    </UserMessage>

</template>

<script>
import UserMessage from './UserMessage.vue'
export default {
    components: {
        UserMessage
    },
    props: ['msg'],
    computed: {
        formatTimeView() {
            return this.msg.createdAt.split('T').join(' ').slice(0, -5);
        }
    }
}
</script>

