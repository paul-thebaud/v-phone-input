import countries, { CountryIso2 } from '@/utils/countries';
import { DISPLAY_MODE_E164, DISPLAY_MODE_NATIONAL } from '@/utils/displayModes';

export const DEFAULT_OPTIONS = {
  disabled: false,
  loading: false,
  label: 'Phone',
  countryLabel: 'Country',
  invalidMessage: 'Given phone number is invalid.',
  hideCountryLabel: false,
  allCountries: countries,
  preferredCountries: [] as CountryIso2[],
  onlyCountries: [] as CountryIso2[],
  ignoredCountries: [] as CountryIso2[],
  defaultCountry: '' as CountryIso2,
  disabledLoadingCountry: false,
  disabledFetchingCountry: false,
  disabledSearchingCountry: false,
  disabledValidation: false,
  textMode: DISPLAY_MODE_NATIONAL,
  valueMode: DISPLAY_MODE_E164,
};

export type VPhoneInputOptions = Partial<typeof DEFAULT_OPTIONS>;

export const options = { ...DEFAULT_OPTIONS };

export function mergeOptions(customOptions: VPhoneInputOptions) {
  Object.assign(options, customOptions);
}

export function getOption(name: keyof typeof DEFAULT_OPTIONS) {
  return options[name];
}
