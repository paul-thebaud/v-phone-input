import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: { background: { base: colors.blue.lighten5 } },
      dark: { background: { base: colors.blueGrey.darken4 } },
    },
  },
});
