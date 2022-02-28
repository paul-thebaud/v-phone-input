import VPhoneCountryFlag from '@/components/VPhoneCountryFlag';
import VPhoneInput from '@/components/VPhoneInput';
import { PluginOptions } from '@/types/options';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import { getOption, mergeOptions } from '@/utils/options';
import { PluginFunction } from 'vue';

const install: PluginFunction<PluginOptions> = (Vue, options?) => {
  mergeOptions(options || {});

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
