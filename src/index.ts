import VPhoneCountrySprite from '@/components/VCountryIconSprite';
import VPhoneCountrySvg from '@/components/VCountryIconSvg';
import VPhoneInput from '@/components/VPhoneInput.vue';
import createVPhoneInput from '@/createVPhoneInput';
import countries from '@/utils/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import StorageMemoIp2cCountryGuesser from '@/utils/countries/storageMemoIp2cCountryGuesser';
import { DEFAULT_OPTIONS, getOption, mergeOptions } from '@/utils/options';
import formatPhone from '@/utils/phone/formatPhone';
import makeExample from '@/utils/phone/makeExample';
import makePhone from '@/utils/phone/makePhone';

export {
  createVPhoneInput,
  VPhoneInput,
  VPhoneCountrySprite,
  VPhoneCountrySvg,
  countries,
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  StorageMemoIp2cCountryGuesser,
  makePhone,
  makeExample,
  formatPhone,
  DEFAULT_OPTIONS,
  mergeOptions,
  getOption,
};
