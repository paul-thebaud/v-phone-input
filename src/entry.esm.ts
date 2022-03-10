import VPhoneCountrySpan from '@/components/VPhoneCountrySpan';
import VPhoneCountrySprite from '@/components/VPhoneCountrySprite';
import VPhoneCountrySvg from '@/components/VPhoneCountrySvg';
import VPhoneInput from '@/components/VPhoneInput.vue';
import { PluginOptions } from '@/types/options';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import { DEFAULT_OPTIONS, getOption, mergeOptions } from '@/utils/options';
import PhoneUtils from '@/utils/phone';
import { PluginFunction } from 'vue';

const install: PluginFunction<PluginOptions> = (Vue, options?) => {
  mergeOptions(options || {});

  Vue.component('VPhoneInput', VPhoneInput);
};

export {
  VPhoneInput,
  VPhoneCountrySpan,
  VPhoneCountrySprite,
  VPhoneCountrySvg,
  PhoneUtils,
  countries,
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  DEFAULT_OPTIONS,
  mergeOptions,
  getOption,
};

export default install;
