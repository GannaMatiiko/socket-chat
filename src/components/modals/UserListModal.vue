<template>
    <div class="text-left">
        <v-dialog
            v-model="dialog"
            width="40%"
            >
            <template v-if="isRoomIdSelected" v-slot:activator="{ props }">
                <v-btn color="" v-bind="props">
                    Show members
                </v-btn>
            </template>

            <v-card title="Chat members">
                <v-card-text>
                    <v-list lines="one">
                      <v-list-item
                        v-for="user in roomUsers"
                        :key="user._id"
                        class="chat-members-list__item"
                        @click="initDialogue(user._id, user.login)"
                      >
                      <v-icon
                        size="default"
                        color="lime-darken-3"
                        icon="mdi-message-text-outline"
                        class="mr-1"
                    ></v-icon>
                      {{ user.login }}
                    </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-green-darken-4" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="orange-darken-2">Cannot chat with myself...</v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        snackbar: false,
        timeout: 2000,
      }
    },
    methods: {
      initDialogue(userId, userLogin) {
        // don't create chat witn myself
        if (userId === this.getCurrentUserId) {
          this.snackbar = true;
          return;
        }

        this.axios.post('/room/create-dialogue', {
          partnerId: userId,
        },  {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
        })
        .then((res) => {
          if (res.data.alreadyExists) {
            this.dialog = false;
            //open dialog with this user
            this.$store.dispatch('selectChatInfo', {roomId: res.data.roomId, isDialogue: true})
          } else {
            let newPrivateChat = {
                  _id: res.data.chatRoom._id,
                  name: userLogin,
                  isDialogue: true
            }
            this.$store.dispatch('addNewChat', newPrivateChat);
            this.dialog = false;
            // open dialog with this user
            this.$store.dispatch('selectChatInfo', {roomId: newPrivateChat._id, isDialogue: true});
          }
        })
        .catch(e => console.error('Cannot create group chat', e))
      }
    },
    computed: {
      roomUsers() {
        return this.$store.getters.getChanelUsers;
      },
      isRoomIdSelected() {
        return this.$store.getters.getActiveRoomId;
      },
      getCurrentUserId() {
        return this.$store.getters.getUserId;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat-members-list {
    &__item {
      cursor: pointer;
      color: $darkGreen;
      font-weight: 700;
    }
  }
</style>