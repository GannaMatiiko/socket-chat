<template>
  <div class="app-wrapper">
    <SideBar></SideBar>
    <ChatPlace></ChatPlace>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import ChatPlace from '@/components/ChatPlace.vue'
  export default {
    components: {
      SideBar,
      ChatPlace
    }
  }
</script>

<style lang="scss">
  .app-wrapper {
    display: flex;
  }
</style>
