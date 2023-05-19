<template>
    <UserMessage>
        <template #author>{{ msg.user }}</template>
        <template #text>{{ msg.text }}</template>
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

</style>