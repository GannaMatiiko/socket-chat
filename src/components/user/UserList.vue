<template>
    <div class="text-left">
        <v-dialog
            v-model="dialog"
            width="40%"
            >
            <template v-slot:activator="{ props }">
                <v-btn color="" v-bind="props">
                    Show members
                </v-btn>
            </template>

            <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
  }
</script>