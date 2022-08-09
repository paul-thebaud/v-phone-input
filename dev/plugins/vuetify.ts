import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import dark from './themes/dark';
import light from './themes/light';

export default createVuetify({
  theme: {
    themes: {
      light,
      dark,
    },
  },
  defaults: {
    VTextField: { color: 'primary' },
    VSwitch: { color: 'primary', inset: true },
  },
});
