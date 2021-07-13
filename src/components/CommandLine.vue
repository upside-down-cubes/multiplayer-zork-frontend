<template>
  <v-container>
    <v-card
      class="overflow-y-auto mx-auto"
      height="400"
      outlined
      id="scroll-target"
    >
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
              <v-col class="text-right" cols="5" v-text="event.time"></v-col>
            </v-row>
          </v-list-item>
        </v-slide-y-transition>
      </v-list>
    </v-card>
    <v-card class="mx-auto" flat outlined>
      <v-card-actions>
        <v-text-field
          v-model="commandInput"
          hide-details
          flat
          label="Enter your command..."
          solo
          @keydown.enter="showCommand"
        >
        </v-text-field>

        <v-btn @click="showCommand">
          <v-icon>mdi-comment-multiple</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <br />
    <br />
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
      card: null,
      elem: null,
      events: [],
      nonce: 0,
    };
  },

  computed: {
    timeline() {
      return this.events.slice();
    },
  },

  methods: {
    async sendCommandLineProblem() {
      // fill here to send data through websocket
      console.log("actions from commandLine page (Press enter or button)");
      this.commandInput = "";
    },

    scroll() {
      this.elem = document.getElementById("scroll-content");
      this.card = document.getElementById("scroll-target");
      this.card.scrollTop = this.elem.offsetHeight;
    },

    showCommand() {
      const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      this.events.push({
        id: this.nonce++,
        text: this.commandInput,
        time: time,
      });

      this.scroll();

      this.sendCommandLineProblem();
      this.commandInput = null;
    },
  },
};
</script>

<style scoped></style>
