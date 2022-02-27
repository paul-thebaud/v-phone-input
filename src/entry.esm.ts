import VPhoneCountryFlag from '@/components/VPhoneCountryFlag';
import VPhoneInput from '@/components/VPhoneInput.vue';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import { getOption, mergeOptions } from '@/utils/options';
import { PluginOptions } from '@/utils/options/types';
import _Vue, { PluginFunction } from 'vue';

const install: PluginFunction<any> = function installVPhoneInput(Vue: typeof _Vue, options = {} as PluginOptions) {
  mergeOptions(options);

  Vue.component('VPhoneInput', VPhoneInput);
};

export {
  VPhoneInput,
  VPhoneCountryFlag,
  countries,
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  mergeOptions,
  getOption,
};

export default install;
