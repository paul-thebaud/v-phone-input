import { PluginOptions } from '@/types/options';
import countries from '@/utils/countries';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import localization from '@/utils/options/localization';

export const DEFAULT_OPTIONS: PluginOptions = {
  ...localization,
  countryIconMode: undefined,
  countryAriaLabel: undefined,
  hideCountryLabel: false,
  allCountries: countries,
  preferredCountries: [],
  onlyCountries: [],
  ignoreCountries: [],
  defaultCountry: undefined,
  countryGuesser: new MemoIp2cCountryGuesser(),
  disableGuessingCountry: false,
  disableGuessLoading: false,
  enableSearchingCountry: false,
  disableValidation: false,
  invalidMessage: undefined,
  displayFormat: 'national',
};

export const options = { ...DEFAULT_OPTIONS };

export function mergeOptions(newOptions: Partial<PluginOptions>) {
  Object.assign(options, newOptions);
}

export function getOption<T extends keyof PluginOptions>(key: T): PluginOptions[T] {
  return options[key];
}
