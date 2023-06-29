<template>
    <v-app-bar
      color="green"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>My chat app</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- show if we have selected group -->
      <UserList></UserList>

      <v-btn variant="text" icon="mdi-account-multiple-plus"></v-btn>

      <v-btn variant="text" icon="mdi-cog"></v-btn>

      <v-btn @click="logout" variant="text" icon="mdi-logout"></v-btn>
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
import UserList from '@/components/user/UserList.vue'
  export default {
    components: {
      UserList
    },
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
    methods: {
      logout() {
        this.axios.post('http://localhost:4000/users/logout', {},  {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            })
            .then(() => {
              this.$router.replace('/login');
              this.$store.dispatch('logoutUser')
            }
            )
      }
    }
  }
</script>

<style scoped>
.v-card {
z-index: unset;
}
</style>
