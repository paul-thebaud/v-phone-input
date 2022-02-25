import _Vue, { PluginFunction } from 'vue';
import VPhoneInput from '@/VPhoneInput.vue';
import { mergeOptions, VPhoneInputOptions } from '@/utils/options';
import countries, { guessCountry, memoizedGuessCountry } from '@/utils/countries';
import {
  DISPLAY_MODE_E164,
  DISPLAY_MODE_INTERNATIONAL,
  DISPLAY_MODE_NATIONAL,
  DISPLAY_MODES,
} from '@/utils/displayModes';

const install: PluginFunction<any> = function installVPhoneInput(Vue: typeof _Vue, options = {} as VPhoneInputOptions) {
  mergeOptions(options);

  Vue.component('VPhoneInput', VPhoneInput);
};

export {
  VPhoneInput,
  countries,
  guessCountry,
  memoizedGuessCountry,
  DISPLAY_MODE_NATIONAL,
  DISPLAY_MODE_INTERNATIONAL,
  DISPLAY_MODE_E164,
  DISPLAY_MODES,
};

export default install;
