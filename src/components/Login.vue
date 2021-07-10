<template v-model="$vuetify.theme.dark">
  <v-container>
    <!--alert message-->
    <v-alert
      :value="alert"
      border="bottom"
      color="green"
      elevation="2"
      dismissible
      type="success"
      >You successfully log in as {{ username }}</v-alert
    >
    <!--page title-->
    <div class="text-center">
      <h1 class="font-weight-light">Login Page</h1>
      <br />
    </div>
    <!--login form-->
    <v-row>
      <v-col offset="3" cols="10" sm="4" md="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <!--username field-->
          <v-text-field
            :rules="userNameRules"
            v-model="username"
            label="Enter Username"
            filled
          ></v-text-field>
          <v-spacer></v-spacer>
          <!--password field-->
          <v-text-field
            :rules="passwordRules"
            v-model="password"
            type="password"
            label="Enter Password"
            filled
          ></v-text-field>
        </v-form>
        <br />
        <v-row cols="12" sm="6" md="4" justify="space-around">
          <!--login button-->
          <v-btn
            :disabled="!valid"
            color="primary"
            elevation="5"
            @click="sendUserInfo"
            >Login</v-btn
          >
          <!--register button w/ form-->
          <v-dialog v-model="form" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Register
              </v-btn>
            </template>
            <v-spacer></v-spacer>
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="username"
                        label="Username*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="password"
                        label="Password*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="form = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="form = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    valid: true,
    username: "",
    userNameRules: [(v) => !!v || "Username can not be empty"],
    password: "",
    passwordRules: [(v) => !!v || "Password can not be empty"],
    alert: false,
    form: false,
  }),

  methods: {
    sendUserInfo() {
      // send user input to verify in database
      if (this.$refs.form.validate() === true) {
        this.alert = true;
      }
    },
  },
};
</script>
