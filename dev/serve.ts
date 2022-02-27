import VPhoneInput from '@/entry.esm';
import '@mdi/font/css/materialdesignicons.css';
import 'flag-icons/css/flag-icons.min.css';
import Vue, { VNode } from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(VPhoneInput);

new Vue({
  vuetify: new Vuetify(),
  render: (h): VNode => h(App),
}).$mount('#app');
