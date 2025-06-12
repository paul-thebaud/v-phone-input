import { Country, CountryGuesser } from '@/types/countries';
import { ParsedPhoneNumber, PhoneNumberFormat } from 'awesome-phonenumber';
import { DefineComponent } from 'vue';

export type CountryIconMode = 'svg' | 'sprite' | 'text' | DefineComponent | undefined;

export type CountryPhoneExample = string | ((country: Country) => string);

export type Message = string | undefined;

export interface MessageOptions {
  label?: Message;
  country: Country;
  example: string;
}

export type MessageResolver = ((options: MessageOptions) => Message) | Message;

export type PhoneValidator = (phone: ParsedPhoneNumber) => boolean;

export interface PluginOptions {
  label: MessageResolver;
  ariaLabel: MessageResolver;
  countryLabel: MessageResolver;
  countryAriaLabel: MessageResolver;
  placeholder: MessageResolver;
  hint: MessageResolver;
  invalidMessage: MessageResolver;
  example: CountryPhoneExample | undefined;
  persistentPlaceholder: boolean | undefined;
  persistentHint: boolean | undefined;
  countryIconMode: CountryIconMode;
  allCountries: Country[];
  preferCountries: string[];
  includeCountries: string[];
  excludeCountries: string[];
  defaultCountry: string | undefined;
  countryGuesser: CountryGuesser;
  guessCountry: boolean;
  disableGuessLoading: boolean;
  enableSearchingCountry: boolean;
  displayFormat: PhoneNumberFormat;
  phoneValidator: PhoneValidator;
}
