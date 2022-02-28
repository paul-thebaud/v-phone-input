import './bootstrap';
import Vue, { VNode } from 'vue';
import Vuetify from 'vuetify';
import VPhoneInputPlugin from '@/entry.esm';
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
