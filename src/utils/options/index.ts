import VPhoneCountryFlag from '@/components/VPhoneCountryFlag';
import countries from '@/utils/countries';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';
import { PluginOptions } from '@/utils/options/types';

export const DEFAULT_OPTIONS: PluginOptions = {
  label: 'Phone',
  countryIconComponent: VPhoneCountryFlag,
  countryLabel: 'Country',
  hideCountryLabel: false,
  computeCountryAriaLabel: ({ label }) => `Country for ${label}`,
  allCountries: countries,
  preferredCountries: [],
  onlyCountries: [],
  ignoredCountries: [],
  defaultCountry: undefined,
  countryGuesser: new MemoIp2cCountryGuesser(),
  disableGuessLoading: false,
  disableGuessingCountry: false,
  enableSearchingCountry: false,
  disableValidation: false,
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
