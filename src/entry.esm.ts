import _Vue, { PluginFunction } from 'vue';
import VPhoneInput from '@/VPhoneInput.vue';
import { mergeOptions, VPhoneInputOptions } from '@/utils/options';

const install: PluginFunction<any> = function installVPhoneInput(Vue: typeof _Vue, options = {} as VPhoneInputOptions) {
  mergeOptions(options);

  Vue.component('VPhoneInput', VPhoneInput);
};

export { VPhoneInput };

export default install;
