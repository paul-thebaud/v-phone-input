import { Country, CountryGuesser, CountryIso2 } from '@/utils/countries/types';
import { VueConstructor } from 'vue';

export type PhoneNumberFormat = 'e164' |
  'international' |
  'national' |
  'rfc3966' |
  'significant';

export type CountryAriaLabelResolver = (options: { label: string }) => string | undefined;

export type InvalidMessageResolver = (options: { label: string, example: string }) => string;

export interface PluginOptions {
  label: string;
  countryIconComponent: VueConstructor | undefined;
  countryLabel: string;
  hideCountryLabel: boolean;
  computeCountryAriaLabel: CountryAriaLabelResolver;
  allCountries: Country[];
  preferredCountries: CountryIso2[];
  onlyCountries: CountryIso2[];
  ignoredCountries: CountryIso2[];
  defaultCountry: CountryIso2 | undefined;
  countryGuesser: CountryGuesser;
  disableGuessLoading: boolean;
  disableGuessingCountry: boolean;
  enableSearchingCountry: boolean;
  disableValidation: boolean;
  computeInvalidMessage: InvalidMessageResolver;
  displayFormat: PhoneNumberFormat;
}
