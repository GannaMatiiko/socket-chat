<template>
    <div class="text-left">
        <v-dialog
            v-model="dialog"
            width="40%"
            >
            <template v-slot:activator="{ props }">
                <!-- Add new user btn -->
                    <v-chip
                    class="ml-2 pr-1 user-label_add-person"
                    color="teal-lighten-1"
                    text-color="white"
                    prepend-icon="mdi-account-plus"
                    v-bind="props"
                    @click="loadUnaddedToChatUsers"
                    >
                </v-chip>
            </template>

            <v-card :title="titleAddToChatUsers">
              <v-form @submit.prevent="addGroupMember" v-model="valid">
                <v-card-text>
                    <v-select
                        v-if="exceptUsersInRoom.length"
                        v-model="addedToChatUsers"
                        :items="exceptUsersInRoom"
                        item-title="login"
                        item-value="_id"
                        label="Add members"
                        :rules="rulesMembersSelect"
                        return-object
                        multiple
                    ></v-select>
                    <div v-else class="text-center">
                        All available users added
                    </div>
                </v-card-text>
                <v-card-actions v-if="exceptUsersInRoom.length !== 0">
                    <v-btn color="light-green-darken-4" block type="submit" :disabled="!valid">Save</v-btn>
                </v-card-actions>
              </v-form>  
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    props: {
        roomId: String,
        roomName: String
    },
    data () {
      return {
        valid: false,
        rulesMembersSelect: [value => Boolean(Object.keys(value || {})[0]) || "Field is required"],
        dialog: false,
        addedToChatUsers: [],
        exceptUsersInRoom: []
      }
    },
    computed: {
        titleAddToChatUsers() {
            return `Whom do you want to add to ${this.roomName}?`
        },
    },
    methods: {
        loadUnaddedToChatUsers() {
            this.axios.get(`/users?exceptUsersInRoomId=${this.roomId}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            })
            .then(res => {
                this.exceptUsersInRoom = res.data.users
            })
            .catch(error => console.error(error))
        },
        addGroupMember() {
            this.axios.put('/room/add-group-members', {
                chatId: this.roomId,
                userIds: this.addedToChatUsers.map(user => user._id)
            }, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} 
            })
            .then(res => {
                this.$store.dispatch('loadRoomMembers', res.data.users);
                this.dialog = false;
                this.addedToChatUsers = [];
                this.exceptUsersInRoom = [];
            }) 
            .catch(error => console.error(error))
        }
    }
  }
</script>

<style scoped lang="scss">
    .user {
        &-label {
            padding: 2px 5px;
            &_add-person {
                cursor: pointer;
                transition: all 0.2s ease;
                background: none;
                &:hover {
                    background: $lightGreen;
                }
            }
        }
    }
</style>