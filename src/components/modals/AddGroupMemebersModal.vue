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
                    @click="clickedChip"
                    >
                </v-chip>

            </template>

            <v-card :title='addToChatUsersTitle'>
              <v-form >
                <v-card-text>
                    <v-select
                        v-model="addedToChatUsers"
                        :items="[]"
                        item-title="login"
                        item-value="_id"
                        label="Add members"
                        return-object
                        multiple
                    ></v-select>
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-green-darken-4" block type="submit">Save</v-btn>
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
        dialog: false,
        addedToChatUsers: [],
      }
    },
    computed: {
        addToChatUsersTitle() {
            return `Whom do you want to add to ${this.roomName}?`
        }
    },
    methods: {
        clickedChip() {
            console.log('clicked Chip');
            this.axios.get('/users?exceptUsersInRoomId=true', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
            })
            .then(res => console.log('resexceptUsersInRoomId', res))
            .catch(error => console.error('errorexceptUsersInRoomId', error))
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