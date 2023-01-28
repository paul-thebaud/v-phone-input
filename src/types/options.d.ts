import { Country, CountryGuesser, CountryIso2 } from '@/types/countries';
import { PhoneNumberFormat } from 'awesome-phonenumber';
import { DefineComponent } from 'vue';

export type CountryIconMode = 'svg' | 'sprite' | DefineComponent | undefined;

export type Message = string | undefined;

export interface MessageOptions {
  label?: Message;
  country: Country;
  example: string;
}

export type MessageResolver = ((options: MessageOptions) => Message) | Message;

export interface PluginOptions {
  label: MessageResolver;
  ariaLabel: MessageResolver;
  countryLabel: MessageResolver;
  countryAriaLabel: MessageResolver;
  placeholder: MessageResolver;
  hint: MessageResolver;
  invalidMessage: MessageResolver;
  persistentPlaceholder: boolean | undefined;
  persistentHint: boolean | undefined;
  countryIconMode: CountryIconMode;
  allCountries: Country[];
  preferCountries: CountryIso2[];
  includeCountries: CountryIso2[];
  excludeCountries: CountryIso2[];
  defaultCountry: CountryIso2 | undefined;
  countryGuesser: CountryGuesser;
  guessCountry: boolean;
  disableGuessLoading: boolean;
  enableSearchingCountry: boolean;
  displayFormat: PhoneNumberFormat;
}
