<template>
    <UserMessage>
        <template #author>{{ msg.login }}</template>
        <template #text >
            <span>
            {{ msg.text }}</span>
        </template>
        <template #time>{{ msg.createdAt }}</template>
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
        // formatTimeView() {
        //     return this.msg.createdAt.split('T').join(' ').slice(0, -5);
        // }
    }
}
</script>

