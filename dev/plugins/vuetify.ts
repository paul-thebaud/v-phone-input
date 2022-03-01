import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: { background: { base: colors.teal.lighten5 } },
      dark: { background: { base: colors.blueGrey.darken4 } },
    },
  },
});
