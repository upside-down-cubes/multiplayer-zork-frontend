<template>
  <v-container>
    <v-dialog transition="dialog-top-transition" max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-blind="attrs" icon v-on="on">
          <v-img
            :src="require('../assets/help.png')"
            height="40"
            width="40"
            contain
          />
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card class="mx-auto" max-width="800" outlined>
          <v-card-title>
            <v-img
              aspect-ratio="1"
              :src="require('../assets/zorklogo.png')"
              height="50"
              max-width="50"
              contain
            />
            <h2 class="font-weight-light">Command Instruction</h2>
          </v-card-title>
          <v-divider inset></v-divider>
          <!--  command tables -->
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left"><h3>Name</h3></th>
                  <th class="text-left"><h3>Description</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in commandList" :key="item.commandName">
                  <td>{{ item.commandName }}</td>
                  <td>{{ item.commandDescription }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "CommandLine",
  data() {
    return {
      commandInput: "",
      loader: null,
      loading: false,
      commandList: [
        {
          commandName: "attack",
          commandDescription: "attacking a monster without any weapon",
        },
        {
          commandName: "attack with (argument)",
          commandDescription: "attacking a monster with a weapon you have",
        },
        {
          commandName: "exit",
          commandDescription: "exit Zork game",
        },
        {
          commandName: "go (argument)",
          commandDescription:
            "Traversing the map, usually followed by North, East, South, West",
        },
        {
          commandName: "play (argument)",
          commandDescription: "choosing a certain map to play",
        },
        {
          commandName: "quit",
          commandDescription: "leave the game into the menu mode",
        },
        {
          commandName: "take (argument)",
          commandDescription:
            "collecting Items found in rooms, usually followed by the item name",
        },
        {
          commandName: "use (argument)",
          commandDescription:
            "consuming an item in your inventory, usually followed by an item name",
        },
      ],
    };
  },
  methods: {
    async sendCommandLineProblem() {
      // fill here to send data through websocket
      console.log("actions from commandLine page (Press enter or button)");
      this.commandInput = "";
    },
  },
};
</script>

<style scoped></style>
