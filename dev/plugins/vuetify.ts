import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'mdiSvg',
  theme: {
    themes: {
      light: { background: { base: colors.teal.lighten5 } },
      dark: { background: { base: colors.blueGrey.darken4 } },
    },
  },
});
