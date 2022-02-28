import VPhoneInputPlugin from '@/entry.esm';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'flag-icons/css/flag-icons.min.css';
import Vue, { VNode } from 'vue';
import Vuetify from 'vuetify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'world-flags-sprite/stylesheets/flags32.css';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(VPhoneInputPlugin, {
  countryIconMode: 'svg',
});

new Vue({
  vuetify: new Vuetify(),
  render: (h): VNode => h(App),
}).$mount('#app');
