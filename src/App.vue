<template>
  <router-view />
</template>

<script>
import socket from "@/plugins/socket.js";
export default {
  name: 'App',
  components: {},
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
  },
  destroyed() {
    socket.off("connect_error");
  },
}
</script>

<style>
  body, #app {
    min-height: 100vh;
  }
</style>