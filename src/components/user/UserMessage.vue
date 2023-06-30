<template>
    <div class="message-wrapper" :class="{'me': msg.isAuthorOwner}">
        <div>
            <span class="message-author">
                <slot name="author"></slot>
            </span>
            <span class="message-time">
                <slot name="time"></slot>
            </span>  
        </div>
        <div class="message-text" :class="{'me': msg.isAuthorOwner, 'service-message': msg.isServiceMessage}">
            <slot name="text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['msg']
    }
</script>

<style lang="scss" scoped>
    .message {
        &-wrapper {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            &.me {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
        }
        &-author {
            margin-right: 10px;
            font-weight: 700;
            color: $darkGreen;
        }
        &-time {
            color: grey;
        }
        &-text {
            margin-top: 5px;
            background: white;
            padding: 10px 15px;
            max-width: fit-content;
            width: 90%;
            color: black;
            border: 2px solid $green;
            line-height: 22px;
            text-align:left;
            border-radius:5px;
            &.me {
                background: $lightGreen;
            }
            &.service-message {
                font-style: italic;
                font-weight: 700;
                border: 2px solid $darkGreen;
            }
        }
    }
</style>