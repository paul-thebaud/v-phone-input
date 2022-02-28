import { Country, CountryGuesser, CountryIso2 } from '@/types/countries';
import { PhoneNumberFormat } from '@/types/phone';
import { VueConstructor } from 'vue';

export type CountryAriaLabelResolver = (options: { label: string }) => string;

export type InvalidMessageResolver = (options: { label: string, example: string }) => string;

export interface PluginOptions {
  label: string;
  countryIconComponent: VueConstructor | undefined;
  countryLabel: string;
  countryAriaLabel: string | undefined;
  computeCountryAriaLabel: CountryAriaLabelResolver;
  hideCountryLabel: boolean;
  allCountries: Country[];
  preferredCountries: CountryIso2[];
  onlyCountries: CountryIso2[];
  ignoreCountries: CountryIso2[];
  defaultCountry: CountryIso2 | undefined;
  countryGuesser: CountryGuesser;
  disableGuessingCountry: boolean;
  disableGuessLoading: boolean;
  enableSearchingCountry: boolean;
  disableValidation: boolean;
  invalidMessage: string | undefined;
  computeInvalidMessage: InvalidMessageResolver;
  displayFormat: PhoneNumberFormat;
}
