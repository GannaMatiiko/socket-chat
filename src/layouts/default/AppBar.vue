<template>
    <v-app-bar
      color="yellow"
      prominent
    >
      <v-icon
            size="default"
            icon="mdi-account-circle"
            class="mr-1 ml-4"
        ></v-icon>

      {{ logLogin}}

      <v-spacer></v-spacer>

      <v-toolbar-title>My chat app</v-toolbar-title>

      <!-- show if we have selected group -->
      <UserListModal v-if="getActiveRoomType === 'chanel'"></UserListModal>

      <CreateChatModal></CreateChatModal>

      <UserSettingsModal></UserSettingsModal>

      <v-btn @click="logout" variant="text" icon="mdi-logout"></v-btn>
    </v-app-bar>
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

    }),
    methods: {
      logout() {
        this.axios.post('/users/logout', {},  {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            })
            .then(() => {
              this.$router.replace('/login');
              this.$store.dispatch('logoutUser')
            })
            .catch(e => console.error('Cannot logout', e))
      }
    },
    mounted() {
      this.$store.dispatch('loadAllUsers');
    },
    computed: {
      logLogin() {
        return localStorage.getItem('login');
      },
      getActiveRoomType() {
        return this.$store.getters.getActiveRoomType;
      }
    }
  }
</script>

<style scoped>
.v-card {
z-index: unset;
}
</style>
