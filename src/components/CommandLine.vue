<template>
  <v-container align="start">
    <v-row class="justify-start">
      <v-col cols="10" sm="7" md="8" align-self="start">
        <!--chatroom prompt-->
        <v-dialog v-model="chatroom" persistent max-width="308">
          <v-card>
            <v-card-title class="justify-center"
              >Select your game room</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text outlined @click="joinRoom(1)"> 1 </v-btn>
              <v-btn text outlined @click="joinRoom(2)"> 2 </v-btn>
              <v-btn text outlined @click="joinRoom(3)"> 3 </v-btn>
              <v-btn text outlined @click="joinRoom(4)"> 4 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
                  <v-col cols="7" v-html="event.text"></v-col>
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
            <!--command mode button-->
            <v-btn
              v-if="!isCommandMode"
              color="#B71C1C"
              @click="isCommandMode = true"
            >
              <span class="white--text"> Command Mode </span>
            </v-btn>
            <v-btn v-else color="#9CCC65" @click="isCommandMode = false">
              <span class="white--text"> Chat Mode </span>
            </v-btn>
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
      </v-col>
      <!-- user info panel -->
      <v-col>
        <v-card class="mx-auto" max-width="380" flat outlined>
          <v-card-title class="justify-center">
            <h2 class="font-weight-light justify-center">Player Info</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text align="center">
            <v-avatar color="primary" size="60">
              <v-icon dark>mdi-account</v-icon>
            </v-avatar>
          </v-card-text>
          <v-card-text align="start">
            <h3 class="font-weight-medium">HP: {{ HP }} / {{ MaxHP }}</h3>
            <br />
            <h3 class="font-weight-medium">ATK: {{ ATK }}</h3>
            <br />
            <h3 class="font-weight-medium">
              Room Description: <br />
              <span v-html="RoomDes"></span>
            </h3>
            <br />
          </v-card-text>
          <v-card-actions>
            <v-col align="end">
              <router-link :to="{ name: 'Home' }">
                <v-btn>Exit</v-btn>
              </router-link>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommandLine",
  data() {
    return {
      HP: "",
      MaxHP: "",
      ATK: "",
      RoomDes: "",
      connection: null,
      commandInput: "",
      commandOutput: "",
      userInfo: "",
      card: null,
      elem: null,
      events: [],
      nonce: 0,
      chatroom: true,
      dialog: false,
      searchEnable: false,
      isCommandMode: false,
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
          commandName: "go",
          commandDescription:
            "Traversing the map, usually followed by North, East, South, West",
        },
        {
          commandName: "play",
          commandDescription: "choosing a certain map to play",
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
      const result = JSON.parse(event.data);
      console.log(result);
      // ================================================================
      self.commandOutput = result.content.replaceAll("\n", "<br/>");
      self.HP = result.hp;
      self.MaxHP = result.maxHp;
      self.ATK = result.attack;
      self.RoomDes = result.roomDescription.replaceAll("\n", "<br/>");
      // ================================================================
      self.addEvents(self.commandOutput, "out");
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
      if (this.commandInput.localeCompare("") !== 0) {
        if (
          !this.commandInput.trim().includes("/quit") &&
          !this.commandInput.trim().includes("/exit")
        ) {
          if (this.isCommandMode) {
            this.connection.send("/".concat(this.commandInput));
          } else {
            this.connection.send(this.commandInput);
          }
        } else {
          this.addEvents("Click the exit button on the right", "out");
        }
      }
    },
    joinRoom(name) {
      this.connection.send(this.$store.state.username + ":" + name);
      this.chatroom = false;
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
      if (
        this.commandInput !== null &&
        this.commandInput.localeCompare("") !== 0
      ) {
        if (this.commandInput.trim().localeCompare("") !== 0) {
          this.addEvents(this.commandInput, "in");
          this.sendCommandLineProblem();
          this.commandInput = null;
        } else {
          this.commandInput = null;
        }
      }
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
