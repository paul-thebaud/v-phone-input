import VCountryIconSprite from '@/components/VCountryIconSprite';
import VCountryIconSvg from '@/components/VCountryIconSvg';
import VPhoneInput from '@/components/VPhoneInput.vue';
import createVPhoneInput from '@/createVPhoneInput';
import '@/scss/v-phone-input.scss';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import StorageMemoIp2cCountryGuesser from '@/utils/countries/storageMemoIp2cCountryGuesser';
import { DEFAULT_OPTIONS, getOption, mergeOptions } from '@/utils/options';
import formatPhone from '@/utils/phone/formatPhone';
import makeExample from '@/utils/phone/makeExample';
import makePhone from '@/utils/phone/makePhone';

export * from '@/types/countries';
export * from '@/types/options';

export {
  createVPhoneInput,
  VPhoneInput,
  VCountryIconSprite,
  VCountryIconSvg,
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  StorageMemoIp2cCountryGuesser,
  makePhone,
  makeExample,
  formatPhone,
  countries,
  DEFAULT_OPTIONS,
  mergeOptions,
  getOption,
};
