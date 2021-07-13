<template>
  <v-container>
    <v-main>
      <div class="text-center">
        <h1 class="font-weight-bold">Welcome to Multiplayer Zork Game</h1>
      </div>
      <br />
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-main>
    <br />
    <div class="text-body-1">
      <p class="font-weight-light">
        Zork is set in "the ruins of an ancient empire lying far underground".
        The player is a nameless adventurer "who is venturing into this
        dangerous land in search of wealth and adventure". The goal is to return
        from exploring the "Great Underground Empire" (GUE, for short) alive and
        with all treasures needed to complete each adventure, ultimately
        inheriting the title of Dungeon Master. The dungeons are stocked with
        many novel creatures, objects, and locations, among them the ferocious
        but light-fearing grues, zorkmids (the GUE's currency), and Flood
        Control Dam #3—all of which are referenced by subsequent Infocom text
        adventures.
        <br />
        <br />
        FrobozzCo International is a fictional monopolistic conglomerate from
        the game. FrobozzCo products are littered throughout all Zork games,
        often to humorous effect.
        <br />
        <br />
        Several treasures and locations in Zork reveal that there used to be a
        large aristocratic family called the Flatheads, who reigned supreme over
        the GUE. The instruction manual to the Zork Trilogy tells the reader
        that there were twelve rulers from this family, referencing the book The
        Lives of the Twelve Flatheads. Some Flatheads are named after historical
        figures. For example, in Zork II, one treasure is a portrait of "J.
        Pierpont Flathead".
      </p>
    </div>
    <br />
    <v-row cols="12" sm="6" md="4" justify="space-around">
      <v-btn
        color="primary"
        :loading="loading"
        :disabled="loading"
        elevation="5"
        @click="loader = 'loading'"
        >Start Game
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </v-row>
    <br />
    <br />
    <br />
    <br />
  </v-container>
</template>

<script>
import router from "../router";

export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src: require("../assets/zork1.jpeg"),
        },
        {
          src: require("../assets/zork2.jpeg"),
        },
        {
          src: require("../assets/zork3.jpeg"),
        },
      ],
      loader: null,
      loading: false,
    };
  },
  watch: {
    async loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);
      await router.push({ name: "Start" });

      this.loader = null;
    },
  },
  methods: {
    async sendUserInfo() {
      console.log("from function sendUserInfo");
    },
  },
};
</script>

<style scoped></style>
