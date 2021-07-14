<template>
  <v-container>
    <!--chat box-->
    <v-card
      class="overflow-y-auto mx-auto"
      height="400"
      outlined
      id="scroll-target"
    >
      <!--list of entered commands-->
      <v-list dense clipped id="scroll-content">
        <v-slide-y-transition group>
          <v-list-item
            v-for="event in timeline"
            :key="event.id"
            class="mb-4"
            small
          >
            <v-row justify="space-between">
              <v-col cols="7" v-text="event.text"></v-col>
              <v-chip v-if="event.from === 'out'" small color="blue"
                >GAME</v-chip
              >
              <v-col
                v-else-if="event.from === 'in'"
                class="text-right"
                cols="5"
                v-text="event.time"
              ></v-col>
            </v-row>
          </v-list-item>
        </v-slide-y-transition>
      </v-list>
    </v-card>
    <!--user input box-->
    <v-card class="mx-auto" flat outlined>
      <v-card-actions>
        <v-text-field
          v-model="commandInput"
          hide-details
          flat
          label="Enter your command..."
          solo
          clearable
          @keydown.enter="showCommand"
        >
        </v-text-field>
        <!--send button-->
        <v-btn @click="showCommand">
          <v-icon>mdi-send</v-icon>
        </v-btn>
        <!--command info button-->
        <div>
          <v-btn @click.stop="dialog = true" class="ml-1">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </div>
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          max-width="800"
        >
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
                <!--command search box-->
                <v-col offset="1">
                  <v-text-field
                    v-model="searchCommand"
                    @keydown.delete="searchList = []"
                    @keydown.enter="search"
                    label="Search here"
                    clearable
                    prepend-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
              </v-card-title>
              <v-divider></v-divider>
              <!--  command tables -->
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left"><h3>Name</h3></th>
                      <th class="text-left"><h3>Description</h3></th>
                    </tr>
                  </thead>
                  <tbody v-if="!searchEnable || searchCommand === ''">
                    <tr v-for="item in commandList" :key="item.commandName">
                      <td>
                        {{ item.commandName }}
                      </td>
                      <td>
                        {{ item.commandDescription }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-for="item in searchList" :key="item.commandName">
                      <td>
                        {{ item.commandName }}
                      </td>
                      <td>
                        {{ item.commandDescription }}
                      </td>
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
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CommandLine",
  data() {
    return {
      connection: null,
      commandInput: "",
      commandOutput: "",
      loader: null,
      loading: false,
      card: null,
      elem: null,
      events: [],
      nonce: 0,
      dialog: false,
      searchEnable: false,
      searchCommand: "",
      commandList: [
        {
          commandName: "attack",
          commandDescription: "attacking a monster without any weapon",
        },
        {
          commandName: "attack with",
          commandDescription: "attacking a monster with a weapon you have",
        },
        {
          commandName: "exit",
          commandDescription: "exit Zork game",
        },
        {
          commandName: "go",
          commandDescription:
            "Traversing the map, usually followed by North, East, South, West",
        },
        {
          commandName: "play",
          commandDescription: "choosing a certain map to play",
        },
        {
          commandName: "quit",
          commandDescription: "leave the game into the menu mode",
        },
        {
          commandName: "take",
          commandDescription:
            "collecting Items found in rooms, usually followed by the item name",
        },
        {
          commandName: "use",
          commandDescription:
            "consuming an item in your inventory, usually followed by an item name",
        },
      ],
      searchList: [],
    };
  },
  created() {
    let self = this;
    console.log("Starting connection to WebSocket Server");
    self.connection = new WebSocket("ws://localhost:8080/api/commandline");
    self.connection.onmessage = function (event) {
      self.commandOutput = event.data;
      self.addEvents(self.commandOutput, "out");
    };
    self.connection.onopen = function () {
      console.log("Successfully connected to the echo websocket server...");
    };
  },
  destroyed() {
    let self = this;
    self.connection.close();
  },
  computed: {
    timeline() {
      return this.events.slice();
    },
  },
  methods: {
    async sendCommandLineProblem() {
      this.connection.send(this.commandInput);
    },
    addEvents(event, from) {
      const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      this.events.push({
        id: this.nonce++,
        text: event,
        time: time,
        from: from,
      });
      this.scroll();
    },
    scroll() {
      this.elem = document.getElementById("scroll-content");
      this.card = document.getElementById("scroll-target");
      this.card.scrollTop = this.elem.offsetHeight;
    },
    showCommand() {
      this.addEvents(this.commandInput, "in");
      this.sendCommandLineProblem();
      this.commandInput = null;
    },
    search() {
      this.searchCommand = this.searchCommand.trim();
      this.searchList = [];
      for (let i = 0; i < this.commandList.length; i++) {
        if (
          this.commandList[i].commandName.localeCompare(this.searchCommand) ===
          0
        ) {
          this.searchList.push(this.commandList[i]);
        }
      }
      this.searchEnable = true;
    },
  },
};
</script>

<style scoped></style>
