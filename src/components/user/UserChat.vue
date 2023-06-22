<template>
    <UserMessage>
        <template #author>{{ msg.user }}</template>
        <template #text >
            <span :class="{'styled-text': msg.styled}">
            {{ msg.text }}</span>
        </template>
        <template #time>{{ msg.date }}</template>
    </UserMessage>

</template>

<script>
import UserMessage from './UserMessage.vue'
export default {
    components: {
        UserMessage
    },
    props: ['msg']
}
</script>

<style lang="scss">
    .styled-text {
        font-weight: 700;
    }
</style>