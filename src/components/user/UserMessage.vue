<template>
    <div class="message-wrapper">
        <div>
            <span class="message-author">
                <slot name="author"></slot>
            </span>
            <span class="message-time">
                <slot name="time"></slot>
            </span>  
        </div>
        <div class="message-text">
            <slot name="text"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .message {
        &-wrapper {
            margin-bottom: 20px;
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

        }
    }
</style>