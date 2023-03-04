<template>
    <UserMessage>
        {{ msg.text }}
    </UserMessage>

</template>

<script>
import UserMessage from './UserMessage.vue'
export default {
    components: {
        UserMessage
    },
    props: {
        msg: {
            type: Array
        }
    }
}
</script>

<style lang="scss">

</style>