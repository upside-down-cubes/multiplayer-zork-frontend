import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#212121",
        secondary: "#616161",
        anchor: "#F5F5F5",
        background: colors.grey.darken4,
      },
    },
  },
});
