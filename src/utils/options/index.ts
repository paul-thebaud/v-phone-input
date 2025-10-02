import { MessageOptions, PluginOptions } from '@/types/options';
import countries from '@/utils/countries';
import MemoIp2cCountryGuesser from '@/utils/countries/memoIp2cCountryGuesser';

/**
 * Default options for VPhoneInput.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * VPhoneInput default options are not meant to be used outside the library.
 */
export const DEFAULT_OPTIONS: PluginOptions = {
  label: 'Phone',
  ariaLabel: undefined,
  countryLabel: undefined,
  countryAriaLabel: (options: MessageOptions) => `Country for ${options.label}`,
  placeholder: undefined,
  hint: undefined,
  invalidMessage: (options: MessageOptions) => `The "${options.label}" field is not a valid phone number (example: ${options.example}).`,
  example: undefined,
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
  phoneValidator: (phone) => phone.valid,
};

const options = { ...DEFAULT_OPTIONS } as PluginOptions;

/**
 * Merge plugin options.
 *
 * @param newOptions
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * VPhoneInput options should only be set during plugin creation.
 */
export function mergeOptions(newOptions: Partial<PluginOptions>) {
  Object.assign(options, newOptions);
}

/**
 * Get a plugin option.
 *
 * @param key
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * VPhoneInput options should not be retrieved. Use your own intermediary variable instead.
 */
export function getOption<T extends keyof PluginOptions>(key: T): PluginOptions[T] {
  return options[key];
}
