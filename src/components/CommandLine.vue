<template>
  <v-container>
    <!--    <div class="text-center">-->
    <!--      <h1 class="font-weight-light">This is start page</h1>-->
    <!--    </div>-->
    <!--    <br />-->
    <!--    <v-row>-->
    <!--      <v-col offset="4" cols="12" sm="6" md="5">-->
    <!--        <v-text-field-->
    <!--          v-on:keyup.enter="sendCommandLineProblem"-->
    <!--          v-model="commandInput"-->
    <!--          label="Enter Command"-->
    <!--          required-->
    <!--        ></v-text-field>-->
    <!--        <p class="font-weight-light">This is User Input: {{ commandInput }}</p>-->
    <!--        <br />-->
    <!--      </v-col>-->
    <!--    </v-row>-->
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
          commandName: "go",
          commandDescription: "test",
        },
        {
          commandName: "exit",
          commandDescription: "test2",
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
