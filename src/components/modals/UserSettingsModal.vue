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
                        <v-radio-group label="How long" v-model="daysToStore">
                            <v-radio label="1 day" value="1"></v-radio>
                            <v-radio label="7 days" value="7"></v-radio>
                            <v-radio label="30 days" value="30"></v-radio>
                        </v-radio-group>
                        <v-radio-group label="How much" v-model="messagesToStore">
                            <v-radio label="500 messages" value="500"></v-radio>
                            <v-radio label="1000 messages" value="1000"></v-radio>
                            <v-radio label="5000 messages" value="5000"></v-radio>
                        </v-radio-group>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-green-darken-4" block @click="dialog = false">Save</v-btn>
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
        daysToStore: '1',
        messagesToStore: '500'
      }
    },
    computed: {
      roomUsers() {
        return this.$store.getters.getChanelUsers;
      }
    }
  }
</script>