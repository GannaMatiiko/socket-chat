<template>
    <v-app-bar
      color="green"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>My chat app</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-account-multiple-plus"></v-btn>

      <v-btn variant="text" icon="mdi-cog"></v-btn>

      <v-btn variant="text" icon="mdi-logout"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list
        :items="items"
      ></v-list>
    </v-navigation-drawer>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style scoped>
.v-card {
z-index: unset;
}
</style>
