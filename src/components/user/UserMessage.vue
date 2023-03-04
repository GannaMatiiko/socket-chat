<template>
    <div class="message-wrapper">
        <span class="message-text">
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .message {
        &-wrapper {
            margin-bottom: 20px;
        }
        &-text {
            background: $green;
            padding: 5px 10px;
        }
    }
</style>