import _Vue, { PluginFunction } from 'vue';
import VPhoneInput from '@/VPhoneInput.vue';
import { mergeOptions, VPhoneInputOptions } from '@/utils/options';

const install: PluginFunction<any> = function installVuetifyPhoneInput(Vue: typeof _Vue, customOptions = {} as VPhoneInputOptions) {
  mergeOptions(customOptions);

  Vue.component('VPhoneInput', VPhoneInput);
};

export { VPhoneInput };

export default install;
