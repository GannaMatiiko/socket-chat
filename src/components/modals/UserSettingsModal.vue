<template>
    <div class="text-left">
        <v-dialog
            v-model="dialog"
            width="40%"
            >
            <template v-slot:activator="{ props }">
                <v-btn variant="text" icon="mdi-cog" v-bind="props"></v-btn>
            </template>

            <v-card title="Manage your chat history">
                <v-card-text>
                    <div class="d-flex mt-5">
                        <v-radio-group label="How long or how much" v-model="chatHistoryOption">
                            <v-radio 
                              v-for="setting in userSettingsData" 
                              :key="setting._id" 
                              :label="setting.name" 
                              :value="setting._id"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-green-darken-4" block @click="storeChatSettings">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-snackbar v-model="settingSaved" :timeout="timeout" color="light-green-darken-1">Saved</v-snackbar>
    <v-snackbar v-model="settingFailed" :timeout="timeout" color="orange-darken-2">Cannot save setting...</v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        settingSaved: false,
        settingFailed: false,
        timeout: 1500,
        chatHistoryOption: +localStorage.getItem('chatHistoryMode'),
        userSettingsData: []
      }
    },
    computed: {
      roomUsers() {
        return this.$store.getters.getChanelUsers;
      }
    },
    methods: {
      storeChatSettings() {
        localStorage.setItem('chatHistoryMode', this.chatHistoryOption);
        this.dialog = false;
        this.axios.put('/users/chat-history-mode', {
          "chatHistoryMode": this.chatHistoryOption
        }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} 
        })
        .then(() => this.settingSaved = true)
        .catch(() => this.settingFailed = true)
      }
    },
    mounted() {
      this.axios.get('/users/chat-history-options', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} 
      })
      .then(res => {
        this.userSettingsData = res.data;
      })
      .catch(e => console.error(e))
    }
  }
</script>