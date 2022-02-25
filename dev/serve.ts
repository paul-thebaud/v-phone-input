import Vue, { VNode } from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VuetifyPhoneInput from '@/entry.esm';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.use(VuetifyPhoneInput);

Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(),
  render: (h): VNode => h(App),
}).$mount('#app');
