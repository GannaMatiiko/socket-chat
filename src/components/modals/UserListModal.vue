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
                      >{{ user.login }}</v-list-item>
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