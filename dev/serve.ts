import VPhoneInputPlugin from '@/entry.esm';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'flag-icons/css/flag-icons.min.css';
import Vue, { VNode } from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(VPhoneInputPlugin);

new Vue({
  vuetify: new Vuetify(),
  render: (h): VNode => h(App),
}).$mount('#app');
