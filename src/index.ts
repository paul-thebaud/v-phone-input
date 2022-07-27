import VPhoneCountrySpan from '@/components/VPhoneCountrySpan';
import VPhoneCountrySprite from '@/components/VPhoneCountrySprite';
import VPhoneCountrySvg from '@/components/VPhoneCountrySvg';
import VPhoneInput from '@/components/VPhoneInput.vue';
import createVPhoneInput from '@/createVPhoneInput';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import StorageMemoIp2cCountryGuesser from '@/utils/countries/storageMemoIp2cCountryGuesser';
import { DEFAULT_OPTIONS, getOption, mergeOptions } from '@/utils/options';
import PhoneUtils from '@/utils/phone';

export {
  createVPhoneInput,
  VPhoneInput,
  VPhoneCountrySpan,
  VPhoneCountrySprite,
  VPhoneCountrySvg,
  PhoneUtils,
  countries,
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  StorageMemoIp2cCountryGuesser,
  DEFAULT_OPTIONS,
  mergeOptions,
  getOption,
};
