<template>
    <div class="text-left">
        <v-dialog
            v-model="dialog"
            width="40%"
            >
            <template v-slot:activator="{ props }">
                <v-btn variant="text" icon="mdi-account-multiple-plus" v-bind="props"></v-btn>
            </template>

            <v-card title="Create group chat">
              <v-form @submit.prevent="createGroupChat" v-model="valid">
                <v-card-text>
                    <v-text-field
                        v-model="chatName"
                        label="Chat name"
                        :rules="rulesNameInput"
                        hide-details="auto"
                    ></v-text-field>

                    <v-select
                        v-model="addedToChatUsers"
                        :items="allChatUsers"
                        item-title="login"
                        item-value="_id"
                        :rules="rulesMembersSelect"
                        label="Add members"
                        return-object
                        multiple
                    ></v-select>
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-green-darken-4" block type="submit" :disabled="!valid">Save</v-btn>
                </v-card-actions>
              </v-form>  
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        valid: false,
        rulesNameInput: [
          value => !!value || 'Required.',
          value => value !== 'General' || 'General chat already exist',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        rulesMembersSelect: [value => Boolean(Object.keys(value || {})[0]) || "Field is required"],
        chatName: '',
        addedToChatUsers: [],
      }
    },
    computed: {
      allChatUsers() {
        return this.$store.getters.getChanelUsers;
      }
    },
    methods: {
      createGroupChat() {
        this.dialog = false;
        
        this.axios.post('http://localhost:4000/room/create-group', {
          name: this.chatName,
          userIds: this.addedToChatUsers.map(user => user._id)
        },  {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }                               
        })
        .then((res) => {
          let newChatGroup = {
            _id: res.data._id,
            name: res.data.name,
            isDialogue: false
          }
          this.$store.dispatch('addNewChat', newChatGroup);
          this.chatName = '';
          this.addedToChatUsers = [];

        })
        .catch(e => console.error('Cannot create group chat', e))
      }
    }
  }
</script>