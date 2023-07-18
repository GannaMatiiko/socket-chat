<template>
    <v-app-bar
      color="yellow"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-icon
            size="default"
            icon="mdi-account-circle"
            class="mr-1"
        ></v-icon>
      {{ logLogin}}

      <v-spacer></v-spacer>

      <v-toolbar-title>My chat app</v-toolbar-title>

      <!-- show if we have selected group -->
      <UserListModal></UserListModal>

      <!-- <v-btn variant="text" icon="mdi-account-multiple-plus"></v-btn> -->
      <CreateChatModal></CreateChatModal>

      <!-- <v-btn variant="text" icon="mdi-cog"></v-btn> -->
      <UserSettingsModal></UserSettingsModal>

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
import UserListModal from '@/components/modals/UserListModal.vue';
import UserSettingsModal from '@/components/modals/UserSettingsModal.vue';
import CreateChatModal from '@/components/modals/CreateChatModal.vue';
  export default {
    components: {
      UserListModal,
      UserSettingsModal,
      CreateChatModal
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
    },
    mounted() {
      this.$store.dispatch('loadAllUsers');
    },
    computed: {
      logLogin() {
        return localStorage.getItem('login');
      }
    }
  }
</script>

<style scoped>
.v-card {
z-index: unset;
}
</style>
