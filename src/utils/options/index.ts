import { MessageOptions, PluginOptions } from '@/types/options';
import countries from '@/utils/countries';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';

export const DEFAULT_OPTIONS: PluginOptions = {
  label: 'Phone',
  ariaLabel: undefined,
  countryLabel: 'Country',
  countryAriaLabel: (options: MessageOptions) => `Country for ${options.label}`,
  placeholder: undefined,
  hint: undefined,
  invalidMessage: (options: MessageOptions) => `The "${options.label}" field is not a valid phone number (example: ${options.example}).`,
  persistentPlaceholder: undefined,
  persistentHint: undefined,
  countryIconMode: undefined,
  allCountries: countries,
  preferCountries: [],
  includeCountries: [],
  excludeCountries: [],
  defaultCountry: undefined,
  countryGuesser: new MemoIp2cCountryGuesser(),
  guessCountry: false,
  disableGuessLoading: false,
  enableSearchingCountry: false,
  displayFormat: 'national',
};

export const options = { ...DEFAULT_OPTIONS };

export function mergeOptions(newOptions: Partial<PluginOptions>) {
  Object.assign(options, newOptions);
}

export function getOption<T extends keyof PluginOptions>(key: T): PluginOptions[T] {
  return options[key];
}
