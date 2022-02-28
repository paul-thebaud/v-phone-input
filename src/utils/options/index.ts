import VPhoneCountryFlag from '@/components/VPhoneCountryFlag';
import countries from '@/utils/countries';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import { PluginOptions } from '@/utils/options/types';

export const DEFAULT_OPTIONS: PluginOptions = {
  label: 'Phone',
  countryIconComponent: VPhoneCountryFlag,
  countryLabel: 'Country',
  countryAriaLabel: undefined,
  computeCountryAriaLabel: ({ label }) => `Country for ${label}`,
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
  computeInvalidMessage: ({ label, example }) =>
    `The "${label}" field is not a valid phone number (example: ${example}).`,
  displayFormat: 'national',
};

export const options = { ...DEFAULT_OPTIONS };

export function mergeOptions(newOptions: Partial<PluginOptions>) {
  Object.assign(options, newOptions);
}

export function getOption<T extends keyof PluginOptions>(key: T): PluginOptions[T] {
  return options[key];
}
