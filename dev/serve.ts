import './bootstrap';
import Vue, { VNode } from 'vue';
import VPhoneInputPlugin from '@/entry.esm';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VPhoneInputPlugin, {
  countryIconMode: 'svg',
});

new Vue({
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
