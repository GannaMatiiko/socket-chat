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
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      initDialogue(userId, userLogin) {
        console.log('USER LOFIN', userLogin);
        this.axios.post('http://localhost:4000/room/create-dialogue', {
          partnerId: userId,
        },  {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
        })
        .then((res) => {
          console.log('77777', res);

          let newPrivateChat = {
                _id: res.data.chatRoom._id,
                name: userLogin,
                isDialogue: true
          }
          
          // TODO change display correct icon and chat name and open chat with this person
          this.$store.dispatch('addNewChat', newPrivateChat);
          this.dialog = false;
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