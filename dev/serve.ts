import { createApp } from 'vue';
import { VAutocomplete } from 'vuetify/components';
import App from './App.vue';
import vPhoneInput from './plugins/vPhoneInput';
import vuetify from './plugins/vuetify';

const app = createApp(App);

app.use(vuetify);
app.component('VAutocomplete', VAutocomplete);
app.use(vPhoneInput);

app.mount('#app');
